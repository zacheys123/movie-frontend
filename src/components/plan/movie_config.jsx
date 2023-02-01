export const setFree = (refs) => {
	refs?.suggestref?.current?.classList.add('remove-active');
	refs?.latestref?.current?.classList.add('remove-active');
	refs?.popularref?.current?.classList.add('remove-active');
};
export const setAmateur = (refs) => {
	refs?.suggestref?.current?.classList.add('remove-active');
	refs?.latestref?.current?.classList.add('remove-active');
	refs?.popularref?.current?.classList.add('active');
};
export const setWorld = (refs) => {
	refs?.suggestref?.current?.classList.add('active');
	refs?.latestref?.current?.classList.add('active');
	refs?.popularref?.current?.classList.add('active');
};
export const setPremium = (refs) => {
	refs?.suggestref?.current?.classList.add('active');
	refs?.latestref?.current?.classList.add('remove-active');
	refs?.popularref?.current?.classList.add('active');
};
