const sortByName = (data, name) =>
	data.sort(function(a, b) {
		var questionA = a[name].toUpperCase();
		var questionB = b[name].toUpperCase();
		if (questionA < questionB) {
			return -1;
		}
		if (questionA > questionB) {
			return 1;
		}
		return 0;
	});
export default sortByName;
