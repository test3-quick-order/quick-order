import { database } from '../firebase/firebase-app';
import { setQtyPagesGoods, generateCodes, generateDescriptions } from './goods';


export const listenToGoods = () => {
	return (dispatch) => {
		try {
			const goodsRef = database.ref('goods');
			goodsRef.off();
			goodsRef.on('value', (snapshot) => {
				dispatch({
					type: 'RECEIVE_GOODS',
					payload: snapshot.val()
				});
				dispatch(setQtyPagesGoods());
	    	dispatch(generateCodes());
	    	dispatch(generateDescriptions());
			}, (error) => {
				dispatch({
					type: 'RECEIVE_GOODS_ERROR',
					message: error.message
				});
			});
		} catch (e) {}
	};
};

