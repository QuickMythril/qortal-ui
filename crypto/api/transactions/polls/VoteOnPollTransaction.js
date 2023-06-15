'use strict'
import TransactionBase from '../TransactionBase.js'
import { QORT_DECIMALS } from '../../constants.js'

export default class VoteOnPollTransaction extends TransactionBase {
	constructor() {
		super()
		this.type = 9
	}

	render(html) {
		return html`
			${this._votedialog1}
			<div style="background: #eee; padding: 8px; margin: 8px 0; border-radius: 5px;">
				<span style="color: #000;">${this._rPollName}</span>
			</div>
			${this._votedialog2}
		`
	}

	set votedialog1(votedialog1) {
		this._votedialog1 = votedialog1
	}

	set votedialog2(votedialog2) {
		this._votedialog2 = votedialog2
	}

	set fee(fee) {
		this._fee = fee * QORT_DECIMALS
		this._feeBytes = this.constructor.utils.int64ToBytes(this._fee)
	}

	set voterAddress(voterAddress) {
		this._voterAddress = voterAddress instanceof Uint8Array ? voterAddress : this.constructor.Base58.decode(voterAddress)
	}

	set rPollName(rPollName) {
		this._rPollName = rPollName
		this._rPollNameBytes = this.constructor.utils.stringtoUTF8Array(this._rGroupName)
	}

	set rOptionIndex(rOptionIndex) {
		this._rOptionIndex = rOptionIndex
		this._rOptionIndexBytes = this.constructor.utils.int32ToBytes(this._rOptionIndex)
	}

	get params() {
		const params = super.params
		params.push(
			this._rPollNameBytes,
			this._rOptionIndexBytes,
			this._feeBytes
		)
		return params
	}
}
