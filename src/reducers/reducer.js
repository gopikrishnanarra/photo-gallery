const defaultState = {
    inventory: [],
};

const reducers = (state = defaultState, action) => {
    if (action.type === 'GET_INVENTORY') {
        return {
            ...state,
            inventory: action.inventory,
            getNewInventory: false,
            edited: false,
            deleted: false
        };
    }
    };
export default reducers
