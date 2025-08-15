import { gsiState, players } from '/hud/core/state.js'
import { getOverriddenTeamName, getTeamNameOverrides } from '/hud/gsi/helpers/team-name-overrides.js'

const getGrenadeKey = (weaponName) => {
	switch (weaponName) {
		case 'weapon_decoy': return '诱饵弹'
		case 'weapon_flashbang': return '闪光弹'
		case 'weapon_hegrenade': return '手雷'
		case 'weapon_smokegrenade': return '烟雾弹'

		case 'weapon_incgrenade':
		case 'weapon_molotov':
			return '燃烧瓶'
	}
}

const getFallbackNameFromSide = (side) => {
	switch (side) {
		case 2: return 'T'
		case 3: return 'CT'
	}
}

const makeTeam = (side, gsiTeamObject, teamNameOverrides) => {
	const teamMembers = players.filter((player) => player.side === side)

	const overriddenTeamName = getOverriddenTeamName(teamNameOverrides, teamMembers)

	const team = {
		side,

		consecutiveRoundLosses: gsiTeamObject.consecutive_round_losses,
		flag: gsiTeamObject.flag,
		matchesWonThisSeries: gsiTeamObject.matches_won_this_series, // TODO we may want to have options override this
		name: overriddenTeamName || gsiTeamObject.name || getFallbackNameFromSide(side),
		players: teamMembers,
		score: gsiTeamObject.score,
		timeoutsRemaining: gsiTeamObject.timeouts_remaining,

		grenades: {
			decoy: 0,
			flashbang: 0,
			hegrenade: 0,
			molotov: 0,
			smokegrenade: 0,
			total: 0,
		},
	}

	for (const player of teamMembers) {
		player.team = team

		for (const grenade of player.grenades) {
			team.grenades.total++
			team.grenades[getGrenadeKey(grenade.name)]++
		}
	}

	return team
}

// NB! This must be called AFTER parsePlayers!
export const parseTeams = () => {
	const teamNameOverrides = getTeamNameOverrides()

	return [
		makeTeam(2, gsiState.map.team_t, teamNameOverrides),
		makeTeam(3, gsiState.map.team_ct, teamNameOverrides),
	].sort((a, b) => a.players[0]?.observerSlot - b.players[0]?.observerSlot)
}
