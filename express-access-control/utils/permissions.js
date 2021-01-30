const AC = require("../utils/accessControl.js");

const hasCreatePermission = (role) => {
	const permission = AC.can(role).createOwn('video');
	return !!permission.granted
}

const hasUserUpdatePermission = (role) => {
	const permission = AC.can(role).updateAny('video');
	return !!permission.granted;
}

const hasUserDeletePermission = (role, isOwner) => {
    console.log("Is Owner", isOwner);
	const permission = ( isOwner && AC.can(role).deleteOwn('video') ) || AC.can(role).deleteAny('video');
    return !!permission.granted;
}

const hasUserReadPermission = (role) => {
	const permission = AC.can(role).readAny('video')
    return !!permission.granted;
}

module.exports = { hasCreatePermission, hasUserUpdatePermission, hasUserDeletePermission, hasUserReadPermission};
