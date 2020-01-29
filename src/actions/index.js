export const getRoles = () =>({
    type: 'GET_ROLES',
});

export const selectRole = () =>({
    type: 'SELECT_ROLE'
})

export const START_AJAX_INIT = () => ({ type: "START_AJAX_INIT" });
export const AJAX_INIT_DONE = () =>({type:"AJAX_INIT_DONE"});
