/*
Copyright 2017-2018 @ irontiga and vbcs (original developer)
*/
'use strict';
import Base58 from './deps/Base58.js'
import { Sha256, Sha512 } from 'asmcrypto.js'
import nacl from './deps/nacl-fast.js'
import utils from './deps/utils.js'

import { generateSaveWalletData } from './storeWallet.js'

import publicKeyToAddress from './wallet/publicKeyToAddress.js'
import AltcoinHDWallet from "./bitcoin/AltcoinHDWallet";

export default class PhraseWallet {
    constructor(seed, walletVersion) {

        this._walletVersion = walletVersion || 2
        this.seed = seed

        this.savedSeedData = {}
        this.hasBeenSaved = false
    }

    set seed(seed) {
        this._byteSeed = seed
        this._base58Seed = Base58.encode(seed)

        this._addresses = []

        this.genAddress(0)
    }

    getAddress(nonce) {
        return this._addresses[nonce]
    }

    get addresses() {
        return this._addresses
    }

    get addressIDs() {
        return this._addresses.map(addr => {
            return addr.address
        })
    }

    get seed() {
        return this._byteSeed
    }

    addressExists(nonce) {
        return this._addresses[nonce] != undefined
    }

    _genAddressSeed(seed) {
        let newSeed = new Sha512().process(seed).finish().result
        newSeed = new Sha512().process(utils.appendBuffer(newSeed, seed)).finish().result
        return newSeed
    }

    genAddress(nonce) {
        if (nonce >= this._addresses.length) {
            this._addresses.length = nonce + 1
        }

        if (this.addressExists(nonce)) {
            return this.addresses[nonce]
        }

        const nonceBytes = utils.int32ToBytes(nonce)

        let addrSeed = new Uint8Array()
        addrSeed = utils.appendBuffer(addrSeed, nonceBytes)
        addrSeed = utils.appendBuffer(addrSeed, this._byteSeed)
        addrSeed = utils.appendBuffer(addrSeed, nonceBytes)

        if (this._walletVersion == 1) {
            addrSeed = new Sha256().process(
                new Sha256()
                    .process(addrSeed)
                    .finish()
                    .result
            ).finish().result

            addrSeed = this._byteSeed
        } else {
            addrSeed = this._genAddressSeed(addrSeed).slice(0, 32)
        }

        const addrKeyPair = nacl.sign.keyPair.fromSeed(new Uint8Array(addrSeed));

        const address = publicKeyToAddress(addrKeyPair.publicKey);
        const qoraAddress = publicKeyToAddress(addrKeyPair.publicKey, true);

        // Create Bitcoin HD Wallet 
        const btcSeed = [...addrSeed];
        const btcWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(btcSeed), false);

        // Create Litecoin HD Wallet 
        const ltcSeed = [...addrSeed];
        const ltcWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x30
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(ltcSeed), false, 'LTC');

        // Create Dogecoin HD Wallet 
        const dogeSeed = [...addrSeed];
        const dogeWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x02FAC398,
                public: 0x02FACAFD,
                prefix: 0x1E
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x71
            }
        }).createWallet(new Uint8Array(dogeSeed), false, 'DOGE');

        // Create Digibyte HD Wallet 
        const dgbSeed = [...addrSeed];
        const dgbWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x1E
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x7E
            }
        }).createWallet(new Uint8Array(dgbSeed), false, 'DGB');

		// Create Ravencoin HD Wallet 
        const rvnSeed = [...addrSeed];
        const rvnWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x3C
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(rvnSeed), false, 'RVN');

		// Create Namecoin HD Wallet 
        const nmcSeed = [...addrSeed];
        const nmcWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x34
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(nmcSeed), false, 'NMC');

		// Create Devcoin HD Wallet 
        const dvcSeed = [...addrSeed];
        const dvcWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(dvcSeed), false, 'DVC');

		// Create Peercoin HD Wallet 
        const ppcSeed = [...addrSeed];
        const ppcWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x37
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(ppcSeed), false, 'PPC');

		// Create Dash HD Wallet 
        const dashSeed = [...addrSeed];
        const dashWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x4C
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x8C
            }
        }).createWallet(new Uint8Array(dashSeed), false, 'DASH');

		// Create CloakCoin HD Wallet 
        const cloakSeed = [...addrSeed];
        const cloakWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x1B
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(cloakSeed), false, 'CLOAK');

		// Create Verge HD Wallet 
        const xvgSeed = [...addrSeed];
        const xvgWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0221312B,
                public: 0x022D2533,
                prefix: 0x1E
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x73
            }
        }).createWallet(new Uint8Array(xvgSeed), false, 'XVG');

		// Create PIVX HD Wallet 
        const pivxSeed = [...addrSeed];
        const pivxWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0221312B,
                public: 0x022D2533,
                prefix: 0x1E
            },
            testnet: {
                private: 0x3A805837,
                public: 0x3A8061A0,
                prefix: 0x8B
            }
        }).createWallet(new Uint8Array(pivxSeed), false, 'PIVX');

		// Create LBRY Credits HD Wallet 
        const lbcSeed = [...addrSeed];
        const lbcWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x55
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(lbcSeed), false, 'LBC');

		// Create Komodo HD Wallet 
        const kmdSeed = [...addrSeed];
        const kmdWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x3C
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0
            }
        }).createWallet(new Uint8Array(kmdSeed), false, 'KMD');

		// Create Firo HD Wallet 
        const firoSeed = [...addrSeed];
        const firoWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x52
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x41
            }
        }).createWallet(new Uint8Array(firoSeed), false, 'FIRO');

		// Create Particl HD Wallet 
        const partSeed = [...addrSeed];
        const partWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x8F1DAEB8,
                public: 0x696E82D1,
                prefix: 0x38
            },
            testnet: {
                private: 0x04889478,
                public: 0xE1427800,
                prefix: 0x76
            }
        }).createWallet(new Uint8Array(partSeed), false, 'PART');

		// Create Bitcoin Cash HD Wallet 
        const bchSeed = [...addrSeed];
        const bchWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(bchSeed), false, 'BCH');

		// Create Bitcoin Gold HD Wallet 
        const btgSeed = [...addrSeed];
        const btgWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x26
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(btgSeed), false, 'BTG');

		// Create VerusCoin HD Wallet 
        const vrscSeed = [...addrSeed];
        const vrscWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x3C
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0
            }
        }).createWallet(new Uint8Array(vrscSeed), false, 'VRSC');

		// Create Bitcoin SV HD Wallet 
        const bsvSeed = [...addrSeed];
        const bsvWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x6F
            }
        }).createWallet(new Uint8Array(bsvSeed), false, 'BSV');

		// Create Ghost HD Wallet 
        const ghostSeed = [...addrSeed];
        const ghostWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x8E8EA8EA,
                public: 0x68DF7CBD,
                prefix: 0x26
            },
            testnet: {
                private: 0x04889478,
                public: 0xE1427800,
                prefix: 0x4B
            }
        }).createWallet(new Uint8Array(ghostSeed), false, 'GHOST');

		// Create Circcash HD Wallet 
        const circSeed = [...addrSeed];
        const circWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x1C
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x58
            }
        }).createWallet(new Uint8Array(circSeed), false, 'CIRC');

		// Create Raptoreum HD Wallet 
        const rtmSeed = [...addrSeed];
        const rtmWallet = new AltcoinHDWallet({
            mainnet: {
                private: 0x0488ADE4,
                public: 0x0488B21E,
                prefix: 0x3C
            },
            testnet: {
                private: 0x04358394,
                public: 0x043587CF,
                prefix: 0x7B
            }
        }).createWallet(new Uint8Array(rtmSeed), false, 'RTM');

        this._addresses[nonce] = {
            address,
            btcWallet,
            ltcWallet,
            dogeWallet,
            dgbWallet,
            rvnWallet,
            nmcWallet,
            dvcWallet,
            ppcWallet,
            dashWallet,
            cloakWallet,
            xvgWallet,
            pivxWallet,
            lbcWallet,
            kmdWallet,
            firoWallet,
            partWallet,
            bchWallet,
            btgWallet,
            vrscWallet,
            bsvWallet,
            ghostWallet,
            circWallet,
            rtmWallet,
            qoraAddress,
            keyPair: {
                publicKey: addrKeyPair.publicKey,
                privateKey: addrKeyPair.secretKey
            },
            base58PublicKey: Base58.encode(addrKeyPair.publicKey),
            seed: addrSeed,
            nonce: nonce
        }
        return this._addresses[nonce]
    }

    generateSaveWalletData(...args) {
        return generateSaveWalletData(this, ...args)
    }
}
