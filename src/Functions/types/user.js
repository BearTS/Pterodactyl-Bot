async function validate(val, message, arg) {
    const matches = val.match(/^(?:<@!?)?([0-9]+)>?$/);
    if(matches) {
        try {
            const user = await message.client.users.fetch(matches[1]);
            if(!user) return false;
            if(arg.oneOf && !arg.oneOf.includes(user.id)) return false;
            return true;
        } catch(err) {
            return false;
        }
    }
    if(!message.guild) return false;
    const search = val.toLowerCase();
    let members = message.guild.members.cache.filter(memberFilterInexact(search));
    if(members.size === 0) return false;
    if(members.size === 1) {
        if(arg.oneOf && !arg.oneOf.includes(members.first().id)) return false;
        return true;
    }
    const exactMembers = members.filter(memberFilterExact(search));
    if(exactMembers.size === 1) {
        if(arg.oneOf && !arg.oneOf.includes(exactMembers.first().id)) return false;
        return true;
    }
    if(exactMembers.size > 0) members = exactMembers;
    return false;
}

function parse(val, message) {
    const matches = val.match(/^(?:<@!?)?([0-9]+)>?$/);
    if(matches) return message.client.users.cache.get(matches[1]) || null;
    if(!message.guild) return null;
    const search = val.toLowerCase();
    const members = message.guild.members.cache.filter(memberFilterInexact(search));
    if(members.size === 0) return null;
    if(members.size === 1) return members.first().user;
    const exactMembers = members.filter(memberFilterExact(search));
    if(exactMembers.size === 1) return exactMembers.first().user;
    return null;
}

function memberFilterExact(search) {
    return mem => mem.user.username.toLowerCase() === search ||
		(mem.nickname && mem.nickname.toLowerCase() === search) ||
		`${mem.user.username.toLowerCase()}#${mem.user.discriminator}` === search;
}

function memberFilterInexact(search) {
    return mem => mem.user.username.toLowerCase().includes(search) ||
		(mem.nickname && mem.nickname.toLowerCase().includes(search)) ||
		`${mem.user.username.toLowerCase()}#${mem.user.discriminator}`.includes(search);
}

module.exports = {
    validate,
    parse
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
