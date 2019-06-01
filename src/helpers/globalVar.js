// This is the selected node when clicked into the nodes list to display the node data
var selectedNode_ = {};

export const updateSelectedNode = function(newSelection, callback) {
	selectedNode_ = newSelection;
	callback();
}

export const getSelectedNode = function() {
	return selectedNode_;
}

// This is the flag which indicates if the device is up and running 
var deviceStarted_ = false;

export const setDeviceStarted = function(startBool) {
	deviceStarted_ = startBool;
}

export const getDeviceStarted = function() {
	return deviceStarted_;
}