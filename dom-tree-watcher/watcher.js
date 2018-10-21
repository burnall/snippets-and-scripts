function watch(selector) {
    const nodes = [...document.querySelectorAll(selector)];
    if (!nodes.length) {
        console.log('No elements found in DOM');
        return;
    }
    const config = {
	    attributes: true,
	    childList: true,
	    subtree: true
    };
    const items = nodes.map(node => ({history: [{time: Date.now(), state: node.outerText}]}));
    const callback = (item, mutations, observer) => {
        const historyItem = {time: Date.now()};
        mutations.forEach(mutationRecord => historyItem.state = mutationRecord.target.outerText);
        item.history.push(historyItem);
    };
    const observers = items.map(item => new MutationObserver(callback.bind(null, item))); 
    nodes.forEach((node, index) => observers[index].observe(node, config));

    return {
        stop: () => observers.forEach(observer => observer.disconnect()),
        items: items
    };
}


