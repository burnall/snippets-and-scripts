function watch(selector, options = {skipIdentical: true}) {
    const nodes = [...document.querySelectorAll(selector)];
    if (!nodes.length) {
        console.log('No elements found in DOM');
        return;
    }
    const config = {
        characterData: true,
	    attributes: true,
	    childList: true,
	    subtree: true
        // attributeOldValue: true,
        // characterDataOldValue: true,
        // attributeFilter: true
    };
    const items = nodes.map(node => ({history: [{time: Date.now(), state: node.outerText}]}));
    const callback = (item, mutations, observer) => {
        const time = Date.now();
        mutations.forEach(mutationRecord => {
            const property = mutationRecord.type === 'characterData' ? 'data' : 'outerText'; 
            const state = mutationRecord.target[property];
            const prevState = item.history[item.history.length - 1].state;
            if (!options.skipIdentical || state !== prevState) {
                historyItem = {
                    type: mutationRecord.type,
                    state: state,
                    time: time
                };
                item.history.push(historyItem);
            }
        });    
    };
    const observers = items.map(item => new MutationObserver(callback.bind(null, item))); 
    nodes.forEach((node, index) => observers[index].observe(node, config));

    return {
        stop: () => observers.forEach(observer => observer.disconnect()),
        items: items
    };
}


