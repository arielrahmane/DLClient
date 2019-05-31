var selectedNode_ = {};

export const updateSelectedNode = function(newSelection) {
	selectedNode_ = newSelection;
}

export const getSelectedNode = function() {
	return selectedNode_;
}