'use strict';
import Base58 from '../deps/Base58.js'
import { Sha256, Sha512 } from 'asmcrypto.js'
import jsSHA from "jssha";
import RIPEMD160 from '../deps/ripemd160.js'
import utils from '../deps/utils.js'
import { EllipticCurve, BigInteger } from './ecbn.js';
import keccak_256 from '../deps/sha3.js'


export default class EthcoinHDWallet {

    constructor(addressParams) {

        /**
         * Seed - 32 bytes
         */

        this.seed = new Uint8Array(32)

        /**
         * Version Bytes - 4 byte
         */

        this.versionBytes = addressParams

        /**
         * Depth - 1 byte
         */

        this.depth = 0

        /**
         * Parent Fingerprint - 4 bytes
         */

        this.parentFingerprint = '0x00000000' // master key

        /**
         * Child Index - 4 bytes
         */

        this.childIndex = '0x00000000' // master key

        /**
         * Chain Code - 32 bytes
         */

        this.chainCode = new Uint8Array(32)

        /**
         * Key Data - 33 bytes
         */

        this.keyData = new Uint8Array(33)

        /**
         * Seed Hash - 64 bytes
         */

        this.seedHash = new Uint8Array(64)

        /**
         * Private Key - 32 bytes
         */

        this.privateKey = new Uint8Array(32)

        /**
         * Public Key - 64 bytes (uncompressed)
         */

        this.publicKey = new Uint8Array(64)

        /**
         * Public Key Hash160 (used to derive the parent fingerprint for derived)
         */

        this.publicKeyHash = new Uint8Array(20)

        /**
         * Master Private Key (Base58 encoded)
         */

        this.masterPrivateKey = ''

        /**
         * Master Public Key (Base58 encoded)
         */

        this.masterPublicKey = ''

        /**
         *  Testnet Master Private Key (Base58 encoded) - THIS IS TESTNET
         */

        this._tMasterPrivateKey = ''

        /**
         * Testnet Master Public Key (Base58 encoded) - THIS IS TESTNET
         */

        this._tmasterPublicKey = ''




        /**
         *  Child Keys Derivation from the Parent Keys
         */


        /**
         * Child Private Key - 32 bytes
         */

        this.childPrivateKey = new Uint8Array(32)

        /**
         * Child Chain Code - 32 bytes
         */

        this.childChainCode = new Uint8Array(32)

        /**
         * Child Public Key - 64 bytes (uncompressed)
         */

        this.childPublicKey = new Uint8Array(64)

        /**
         * Child Public Key Hash160 (used to derive the parent fingerprint for derived)
         */

        this.childPublicKeyHash = new Uint8Array(20)

        /**
         * Extended Private Child Key - Base58 encoded
         */

        this.xPrivateChildKey = ''

        /**
         * Extended Public Child Key - Base58 encoded
         */

        this.xPublicChildKey = ''



        /**
         *  Grand Child Keys Derivation from the Child Keys
         */


        /**
         * Grand Child Private Key - 32 bytes
         */

        this.grandChildPrivateKey = new Uint8Array(32)

        /**
         * Grand Child Chain Code - 32 bytes
         */

        this.grandChildChainCode = new Uint8Array(32)

        /**
         * Grand Child Public Key - 64 bytes (uncompressed)
         */

        this.grandChildPublicKey = new Uint8Array(64)

        /**
         * Grand Public Key Hash160 (used to derive the parent fingerprint for derived)
         */

        this.grandChildPublicKeyHash = new Uint8Array(20)

        /**
         * Extended Private Grand Child Key - Base58 encoded
         */

        this.xPrivateGrandChildKey = ''

        /**
         * Extended Public Grand Child Key - Base58 encoded
         */

        this.xPublicGrandChildKey = ''

        /**
         * Ethereum Address - Derived from the Grand Child Public Key Hash
         */

        this.ethereumAddress = ''

        /**
         * TESTNET Ethereum Address (Derived from the Grand Child Public Key Hash) - THIS IS TESTNET
         */

        this._tethereumAddress = ''


        /**
         * Wallet - Wallet Object (keys...)
         */

        this.wallet = {}
    }

    setSeed(seed) {
        this.seed = seed
    }

    createWallet(seed, isBIP44, indicator = null) {

        // Set Seeed
        this.setSeed(seed)

        // Generate Seed Hash
        this.generateSeedHash(this.seed, isBIP44, indicator)

        // Generate Private Key
        this.generatePrivateKey(this.seedHash)

        // Generate Chain Code
        this.generateChainCode(this.seedHash)

        // Generate Public Key from Private Key
        this.generatePublicKey(this.privateKey)

        // Generate Mainnet Master Private Key
        this.generateMainnetMasterPrivateKey()

        // Generate Mainnet Master Public Key
        this.generateMainnetMasterPublicKey()

        // Generate Testnet Master Private Key
        this.generateTestnetMasterPrivateKey()

        // Generate Testnet Master Public Key
        this.generateTestnetMasterPublicKey()

        // Generate Child and Grand Child Keys
        this.generateDerivedChildKeys()

        // Return Wallet Object Specification
        return this.returnWallet()
    }


    generateSeedHash(seed, isBIP44, indicator = null) {

        let buffer;

        if (isBIP44) {
            buffer = utils.appendBuffer(seed.reverse(), utils.int32ToBytes(indicator))
        } else {
            if(indicator !== null) {
                const indicatorString = utils.stringtoUTF8Array(indicator);
                buffer = utils.appendBuffer(seed.reverse(), indicatorString);
            }
            else
            {
                buffer = seed.reverse();
            }
        }

        const _reverseSeedHash = new Sha256().process(buffer).finish().result;
        this.seedHash = new Sha512().process(utils.appendBuffer(seed, _reverseSeedHash)).finish().result;
    }

    generatePrivateKey(seedHash) {

        const SECP256K1_CURVE_ORDER = new BigInteger("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

        const privateKeyHash = seedHash.slice(0, 32);

        const _privateKeyHash = [...privateKeyHash]
        let privateKeyBigInt = BigInteger.fromByteArrayUnsigned(_privateKeyHash);

        const privateKey = (privateKeyBigInt.mod(SECP256K1_CURVE_ORDER.subtract(BigInteger.ONE))).add(BigInteger.ONE)
        this.privateKey = privateKey.toByteArrayUnsigned()
    }

    generateChainCode(seedHash) {

        this.chainCode = new Sha256().process(seedHash.slice(32, 64)).finish().result;
    }

    generatePublicKey(privateKey) {

        const _privateKey = [...privateKey]
        const privateKeyBigInt = BigInteger.fromByteArrayUnsigned(_privateKey);

        const epCurve = EllipticCurve.getSECCurveByName("secp256k1");
        const curvePoints = epCurve.getG().multiply(privateKeyBigInt);


        const x = curvePoints.getX().toBigInteger();
        const y = curvePoints.getY().toBigInteger();

        // Deriving Uncompressed Public Key (64 bytes)
        const publicKeyBytes = EllipticCurve.integerToBytes(x, 32);
        this.publicKey = publicKeyBytes.concat(EllipticCurve.integerToBytes(y, 32));

        // PublicKey Hash
        this.publicKeyHash = keccak_256(this.publicKey).digest().substring(12,32);
    }

    generateMainnetMasterPrivateKey() {

        // Serialization Variable
        const s = []

        // Append Version Byte
        s.push(...(utils.int32ToBytes(this.versionBytes.mainnet.private)))

        // Append Depth
        s.push(this.depth)

        // Append Parent Fingerprint
        s.push(...(utils.int32ToBytes(this.parentFingerprint)))

        // Append Child Number
        s.push(...(utils.int32ToBytes(this.childIndex)))

        // Append Chain Code
        s.push(...this.chainCode)

        // Append 1 byte '0x00' (to make the key data 33 bytes, DO THIS ONLY FOR PRIVATE KEYS )
        s.push(0)

        //if the private key length is less than 32 let's add leading zeros 
        if(this.privateKey.length<32){
            for(let i=this.privateKey.length;i<32;i++){
                s.push(0)
            }
        }

        // Append Private Key
        s.push(...this.privateKey)

        // Generate CheckSum
        const _s = new Uint8Array(s)
        const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
        const checkSum = _checkSum.slice(0, 4)

        // Append CheckSum
        s.push(...checkSum) // And this brings us to the end of the serialization...

        // Save to Private Key as Base58 encoded
        this.masterPrivateKey = Base58.encode(s)
    }

    generateMainnetMasterPublicKey() {

        // Serialization Variable
        const s = []

        // Append Version Byte
        s.push(...(utils.int32ToBytes(this.versionBytes.mainnet.public)))

        // Append Depth
        s.push(this.depth)

        // Append Parent Fingerprint
        s.push(...(utils.int32ToBytes(this.parentFingerprint)))

        // Append Child Number
        s.push(...(utils.int32ToBytes(this.childIndex)))

        // Append Chain Code
        s.push(...this.chainCode)

        // Append Public Key
        s.push(...this.publicKey)

        // Generate CheckSum
        const _s = new Uint8Array(s)
        const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
        const checkSum = _checkSum.slice(0, 4)

        // Append CheckSum
        s.push(...checkSum) // And this brings us to the end of the serialization...

        // Save to Public Key as Base58 encoded
        this.masterPublicKey = Base58.encode(s)
    }

    generateTestnetMasterPrivateKey() {

        // To be Used ONLY in Testnet...

        // Serialization Variable
        const s = []

        // Append Version Byte
        s.push(...(utils.int32ToBytes(this.versionBytes.testnet.private)))

        // Append Depth
        s.push(this.depth)

        // Append Parent Fingerprint
        s.push(...(utils.int32ToBytes(this.parentFingerprint)))

        // Append Child Number
        s.push(...(utils.int32ToBytes(this.childIndex)))

        // Append Chain Code
        s.push(...this.chainCode)

        // Append 1 byte '0x00' (to make the key data 33 bytes, DO THIS ONLY FOR PRIVATE KEYS )
        s.push(0)

        // Append Private Key
        s.push(...this.privateKey)

        // Generate CheckSum
        const _s = new Uint8Array(s)
        const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
        const checkSum = _checkSum.slice(0, 4)

        // Append CheckSum
        s.push(...checkSum) // And this brings us to the end of the serialization...

        // Save to Private Key as Base58 encoded
        this._tMasterPrivateKey = Base58.encode(s)
    }

    generateTestnetMasterPublicKey() {

        // To be Used ONLY in Testnet...

        // Serialization Variable
        const s = []

        // Append Version Byte
        s.push(...(utils.int32ToBytes(this.versionBytes.testnet.public)))

        // Append Depth
        s.push(this.depth)

        // Append Parent Fingerprint
        s.push(...(utils.int32ToBytes(this.parentFingerprint)))

        // Append Child Number
        s.push(...(utils.int32ToBytes(this.childIndex)))

        // Append Chain Code
        s.push(...this.chainCode)

        // Append Private Key
        s.push(...this.publicKey)

        // Generate CheckSum
        const _s = new Uint8Array(s)
        const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
        const checkSum = _checkSum.slice(0, 4)

        // Append CheckSum
        s.push(...checkSum) // And this brings us to the end of the serialization...

        // Save to Private Key as Base58 encoded
        this._tmasterPublicKey = Base58.encode(s)
    }

    generateDerivedChildKeys() {

        // SPEC INFO: https://en.bitcoin.it/wiki/BIP_0032#Child_key_derivation_.28CKD.29_functions
        // NOTE: will not be using some of derivations func as the value is known. (So I'd rather shove in the values and rewrite out the derivations later ?)

        // NOTE: I "re-wrote" and "reduplicate" the code for child and grandChild keys derivations inorder to get the child and grandchild from the child
        // TODO: Make this more better in the future

        const path = 'm/0/0'
        // let p = path.split('/');

        // Get Public kEY
        const derivePublicChildKey = () => {

            const _privateKey = [...this.childPrivateKey]
            const privateKeyBigInt = BigInteger.fromByteArrayUnsigned(_privateKey);

            const epCurve = EllipticCurve.getSECCurveByName("secp256k1");
            const curvePoints = epCurve.getG().multiply(privateKeyBigInt);

            const x = curvePoints.getX().toBigInteger();
            const y = curvePoints.getY().toBigInteger();

            // Uncompressed Public Key (64 bytes)
            const childPublicKeyBytes = EllipticCurve.integerToBytes(x, 32);
            this.childPublicKey = childPublicKeyBytes.concat(EllipticCurve.integerToBytes(y, 32));

            // PublicKey Hash
            this.childPublicKeyHash = keccak_256(this.childPublicKey).digest().substring(12,32);


            // Call deriveExtendedPublicChildKey // WIll be hardcoding the values...
            deriveExtendedPublicChildKey(1, 0)
        }

        const derivePrivateChildKey = (cI) => {

            let ib = [];
            ib.push((cI >> 24) & 0xff);
            ib.push((cI >> 16) & 0xff);
            ib.push((cI >> 8) & 0xff);
            ib.push(cI & 0xff);

            const s = [...this.publicKey].concat(ib);

            const _hmacSha512 = new jsSHA("SHA-512", "UINT8ARRAY", { numRounds: 1, hmacKey: { value: this.chainCode, format: "UINT8ARRAY" } });
            _hmacSha512.update(new Uint8Array(s))


            const IL = BigInteger.fromByteArrayUnsigned([..._hmacSha512.getHMAC('UINT8ARRAY').slice(0, 32)])
            this.childChainCode = _hmacSha512.getHMAC('UINT8ARRAY').slice(32, 64) // IR according to the SPEC


            // SECP256k1 init
            const epCurve = EllipticCurve.getSECCurveByName("secp256k1");


            const ki = IL.add(BigInteger.fromByteArrayUnsigned(this.privateKey)).mod(epCurve.getN()); // parse256(IL) + kpar (mod n) ==> ki
            this.childPrivateKey = ki.toByteArrayUnsigned()

            // Call deriveExtendedPrivateChildKey
            deriveExtendedPrivateChildKey(1, 0)
        }


        const deriveExtendedPrivateChildKey = (i, childIndex) => {

            // Serialization Variable
            const s = []

            // Append Version Byte
            s.push(...(utils.int32ToBytes(this.versionBytes.mainnet.private)))

            // Append Depth (using the index as depth)
            i = parseInt(i)
            s.push(i)

            // Append Parent Fingerprint
            s.push(...(this.publicKeyHash.slice(0, 4)))

            // Append Child Index
            s.push(childIndex >>> 24);
            s.push((childIndex >>> 16) & 0xff);
            s.push((childIndex >>> 8) & 0xff);
            s.push(childIndex & 0xff);

            // Append Chain Code
            s.push(...this.childChainCode)

            // Append 1 byte '0x00' (to make the key data 33 bytes, DO THIS ONLY FOR PRIVATE KEYS )
            s.push(0)

            // Append Private Key
            s.push(...this.childPrivateKey)

            // Generate CheckSum
            const _s = new Uint8Array(s)
            const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
            const checkSum = _checkSum.slice(0, 4)

            // Append CheckSum
            s.push(...checkSum) // And this brings us to the end of the serialization...

            // Save to Private Key as Base58 encoded
            this.xPrivateChildKey = Base58.encode(s)
        }

        const deriveExtendedPublicChildKey = (i, childIndex) => {

            // Serialization Variable
            const s = []

            // Append Version Byte
            s.push(...(utils.int32ToBytes(this.versionBytes.mainnet.public)))

            // Append Depth
            i = parseInt(i)
            s.push(i)

            // Append Parent Fingerprint
            s.push(...(this.publicKeyHash.slice(0, 4)))

            // Append Child Index
            s.push(childIndex >>> 24);
            s.push((childIndex >>> 16) & 0xff);
            s.push((childIndex >>> 8) & 0xff);
            s.push(childIndex & 0xff);

            // Append Chain Code
            s.push(...this.childChainCode)

            // Append Public Key
            s.push(...this.childPublicKey)

            // Generate CheckSum
            const _s = new Uint8Array(s)
            const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
            const checkSum = _checkSum.slice(0, 4)

            // Append CheckSum
            s.push(...checkSum) // And this brings us to the end of the serialization...


            // Save to Public Key as Base58 encoded
            this.xPublicChildKey = Base58.encode(s)
        }


        /**
         * GRAND CHILD KEYS
         *
         * NOTE: I know this is not the best way to generate this (even though it works the way it ought)
         * Things to rewrite will be and not limited to deriving this through a for loop, removing hard code values, etc...
         */

        const derivePublicGrandChildKey = () => {

            const _privateKey = [...this.grandChildPrivateKey]
            const privateKeyBigInt = BigInteger.fromByteArrayUnsigned(_privateKey);


            const epCurve = EllipticCurve.getSECCurveByName("secp256k1");
            const curvePoints = epCurve.getG().multiply(privateKeyBigInt);

            const x = curvePoints.getX().toBigInteger();
            const y = curvePoints.getY().toBigInteger();

            // Deriving Uncompressed Public Key (64 bytes)
            const grandChildPublicKeyBytes = EllipticCurve.integerToBytes(x, 32);
            this.grandChildPublicKey = grandChildPublicKeyBytes.concat(EllipticCurve.integerToBytes(y, 32));

            // PublicKey Hash
            this.grandChildPublicKeyHash = keccak_256(this.grandChildPublicKey).digest().substring(12,32);


            // Call deriveExtendedPublicChildKey // WIll be hardcoding the values...
            deriveExtendedPublicGrandChildKey(2, 0)

            /**
             * Derive Ethereum Address
             */

                // Append Address Prefix
            const ethereumAddress = [this.versionBytes.mainnet.prefix].concat(grandChildPublicKeyHash.hex())


            /**
             * Derive TESTNET Ethereum Address
             */

                // Append Version Byte
			const _tethereumAddress = [this.versionBytes.testnet.prefix].concat(grandChildPublicKeyHash.hex())
        }

        const derivePrivateGrandChildKey = (cI, i) => {

            let ib = [];
            ib.push((cI >> 24) & 0xff);
            ib.push((cI >> 16) & 0xff);
            ib.push((cI >> 8) & 0xff);
            ib.push(cI & 0xff);

            const s = [...this.childPublicKey].concat(ib);


            const _hmacSha512 = new jsSHA("SHA-512", "UINT8ARRAY", { numRounds: 1, hmacKey: { value: this.childChainCode, format: "UINT8ARRAY" } });
            _hmacSha512.update(new Uint8Array(s))


            const IL = BigInteger.fromByteArrayUnsigned([..._hmacSha512.getHMAC('UINT8ARRAY').slice(0, 32)])
            this.grandChildChainCode = _hmacSha512.getHMAC('UINT8ARRAY').slice(32, 64) // IR according to the SPEC

            // SECP256k1 init
            const epCurve = EllipticCurve.getSECCurveByName("secp256k1");


            const ki = IL.add(BigInteger.fromByteArrayUnsigned(this.childPrivateKey)).mod(epCurve.getN()); // parse256(IL) + kpar (mod n) ==> ki
            this.grandChildPrivateKey = ki.toByteArrayUnsigned()


            // Call deriveExtendedPrivateChildKey
            deriveExtendedPrivateGrandChildKey(2, 0)
        }


        const deriveExtendedPrivateGrandChildKey = (i, childIndex) => {

            // Serialization Variable
            const s = []

            // Append Version Byte
            s.push(...(utils.int32ToBytes(this.versionBytes.mainnet.private)))

            // Append Depth (using the index as depth)
            i = parseInt(i)
            s.push(i)

            // Append Parent Fingerprint
            s.push(...(this.childPublicKeyHash.slice(0, 4)))

            // Append Child Index
            s.push(childIndex >>> 24);
            s.push((childIndex >>> 16) & 0xff);
            s.push((childIndex >>> 8) & 0xff);
            s.push(childIndex & 0xff);

            // Append Chain Code
            s.push(...this.grandChildChainCode)

            // Append 1 byte '0x00' (to make the key data 33 bytes, DO THIS ONLY FOR PRIVATE KEYS )
            s.push(0)

            // Append Private Key
            s.push(...this.grandChildPrivateKey)

            // Generate CheckSum
            const _s = new Uint8Array(s)
            const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
            const checkSum = _checkSum.slice(0, 4)

            // Append CheckSum
            s.push(...checkSum) // And this brings us to the end of the serialization...

            // Save to Private Key as Base58 encoded
            this.xPrivateGrandChildKey = Base58.encode(s)
        }

        const deriveExtendedPublicGrandChildKey = (i, childIndex) => {

            // Serialization Variable
            const s = []

            // Append Version Byte
            s.push(...(utils.int32ToBytes(this.versionBytes.mainnet.public)))

            // Append Depth
            i = parseInt(i)
            s.push(i)

            // Append Parent Fingerprint
            s.push(...(this.childPublicKeyHash.slice(0, 4)))

            // Append Child Index
            s.push(childIndex >>> 24);
            s.push((childIndex >>> 16) & 0xff);
            s.push((childIndex >>> 8) & 0xff);
            s.push(childIndex & 0xff);

            // Append Chain Code
            s.push(...this.grandChildChainCode)

            // Append Public Key
            s.push(...this.grandChildPublicKey)

            // Generate CheckSum
            const _s = new Uint8Array(s)
            const _checkSum = new Sha256().process(new Sha256().process(_s).finish().result).finish().result
            const checkSum = _checkSum.slice(0, 4)

            // Append CheckSum
            s.push(...checkSum) // And this brings us to the end of the serialization...

            // Save to Public Key as Base58 encoded
            this.xPublicGrandChildKey = Base58.encode(s)
        }



        // Hard Code value..
        let childIndex = 0

        // Call derivePrivateChildKey //Hard code value
        derivePrivateChildKey(childIndex)

        // Call derivePublicChildKey
        derivePublicChildKey()


        // Call derivePrivateGrandChildKey // Hard Code value...
        derivePrivateGrandChildKey(0, 2)

        // Call derivePublicGrandChildKey
        derivePublicGrandChildKey()
    }

    returnWallet() {

        // Will be limiting the exported Wallet Object to just the Master keys and Legacy Addresses

        const wallet = {
            derivedMasterPrivateKey: this.masterPrivateKey,
            derivedMasterPublicKey: this.masterPublicKey,
            _tDerivedMasterPrivateKey: this._tMasterPrivateKey,
            _tDerivedmasterPublicKey: this._tmasterPublicKey,
            // derivedPrivateChildKey: this.xPrivateChildKey,
            // derivedPublicChildKey: this.xPublicChildKey,
            // derivedPrivateGrandChildKey: this.xPrivateGrandChildKey,
            // derivedPublicGrandChildKey: this.xPublicGrandChildKey,
            address: this.ethereumAddress,
            _taddress: this._tethereumAddress
        }

        this.wallet = wallet
        return wallet
    }
}
