const carManager = (() => {
    return {
        requestInfo(model, id) {
            return `The information for ${model} with ID ${id} is foobar`;
        },

        buyVehicle(model, id) {
            return `You have successfully purchased Item ${id}, a ${model}`;
        },

        arrangeViewing(model, id) {
            return `You have successfully booked a viewing of ${model} ( ${id} ) `;
        },
    };
})();

carManager.execute = function(name, ...args) {
    return (
        carManager[name] &&
        carManager[name].apply(carManager, args)
    );
};

carManager.execute('arrangeViewing', 'Ferrari', '14523');
carManager.execute('requestInfo', 'Ford Mondeo', '54323');
carManager.execute('requestInfo', 'Ford Escort', '34232');
carManager.execute('buyVehicle', 'Ford Escort', '34232');
