const targetNode = document.getElementById('Example');

const config = { 
	attributes: true, 
	childList: true, 
	subtree: true
};

const callback = (mutations, observer) => {
    for (let mutation of mutations) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
        console.log(mutation);
    }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

// observer.disconnect()