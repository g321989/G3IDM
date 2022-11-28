export const ReadTreeJson = (data) => {
	let arry = [];
	const getJSONObj = (data) => {
		data.map((treeItemData) => {
			if (treeItemData.name) {
				arry.push({
					name: treeItemData?.name ? treeItemData?.name : "",
					id: treeItemData?.id,
					_id: treeItemData?._id,
					_key: treeItemData?._key,
					children: OrganizationObj(treeItemData?.Organization),
					icon: "enterprice",
				});
			}
		});
	};
	getJSONObj(data);
	return arry;
};
export const OrganizationObj = (data) => {
	let arry = [];
	const getJSONObj = (data) => {
		data.map((treeItemData) => {
			if (treeItemData.name) {
				arry.push({
					name: treeItemData?.name ? treeItemData?.name : "",
					id: treeItemData?.id,
					_id: treeItemData?._id,
					children: facilityObj(treeItemData?.facility),
					_key: treeItemData?._key,
					icon: "organization",
				});
			}
		});
	};
	getJSONObj(data);
	return arry;
};

export const facilityObj = (data) => {
	let arry = [];
	const getJSONObj = (data) => {
		data.map((treeItemData) => {
			if (treeItemData.name) {
				arry.push({
					name: treeItemData?.name ? treeItemData?.name : "",
					id: treeItemData?.id,
					_id: treeItemData?._id,
					_key: treeItemData?._key,
					icon: "facility",
					children: [],
				});
			}
		});
	};
	getJSONObj(data);
	return arry;
};
