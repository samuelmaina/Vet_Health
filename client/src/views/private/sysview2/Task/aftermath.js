import * as Styled from '../../../../components';
import { UploadData, useAuthDispatch } from '../../../../context';
import React, { useState } from 'react';
import * as utils from '../../../../utils';
export const Aftermath = (props) => {
	const dispatch = useAuthDispatch();
	const [amount, setAmount] = useState(0.0);
	const [infections, setBrief] = useState('');

	async function postDetails(e) {
		const data = {
			infections: infections,
			job_id: props.data._id,
			amount: Number(amount),
		};
		let response = await UploadData(dispatch, data, utils.remoteuri.jobPrice);
		if (response) {
			response = await UploadData(
				dispatch,
				{ job_id: data.job_id },
				utils.remoteuri.removeFromPool
			);
			if (response) {
				//Remove Job from job pool
				props.handlerecChange(false);
				props.setAfterMath(false);
			}
		}
	}

	return (
		<div>
			<Styled.AfterMath>
				<div>
					<Styled.CashInput
						type='text'
						placeholder='Amount In Ksh'
						value={amount ? amount : ''}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>
				<Styled.Ksh254>Ksh</Styled.Ksh254>
				<div>
					<textarea
						rows={10}
						cols={49}
						placeholder='infections Details in brief..'
						onChange={(e) => setBrief(e.target.value)}
					/>
				</div>

				<Styled.DivConfirmAfterMath>
					<Styled.ConfirmAfterMath
						type='button'
						onClick={(e) => postDetails(e)}>
						Done
					</Styled.ConfirmAfterMath>
				</Styled.DivConfirmAfterMath>
			</Styled.AfterMath>
		</div>
	);
};
