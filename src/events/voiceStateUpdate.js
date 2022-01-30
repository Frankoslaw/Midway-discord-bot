module.exports = {
	name: 'voiceStateUpdate',
	execute(oldState, newState) {
		if (oldState.member.user.bot) return;
        var role = oldState.guild.roles.cache.find(role => role.name === "Gej");

        if(newState.channelId === null){ //left
            if(oldState.channelId == 927327775847755826){
                oldState.member.roles.remove(role)
            }
        }else if(oldState.channelId === null){ // joined
            if(newState.channelId == 927327775847755826){
                newState.member.roles.add(role)
            }
        }else{ // moved
            if(oldState.channelId == 927327775847755826){
                oldState.member.roles.remove(role)
            }
            if(newState.channelId == 927327775847755826){
                newState.member.roles.add(role)
            }
        }
	},
};

//927327775847755826