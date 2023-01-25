export const setFree = (refs) => {
	refs?.suggestref?.current?.classList.add('remove-active');
	refs?.latestref?.current?.classList.add('remove-active');
	refs?.tworef?.current?.classList.add('remove-active');
	refs?.threeref?.current?.classList.add('remove-active');
};
export const setAmateur = (refs) => {
	refs?.suggestref?.current?.classList.add('remove-active');
	refs?.latestref?.current?.classList.add('remove-active');
	refs?.tworef?.current?.classList.add('remove-active');
	refs?.threeref?.current?.classList.add('remove-active');
};
export const setWorld = (refs) => {
	refs?.suggestref?.current?.classList.add('active');
	refs?.latestref?.current?.classList.add('remove-active');
	refs?.tworef?.current?.classList.add('active');
	refs?.threeref?.current?.classList.add('active');
};
export const setPremium = (refs) => {
	refs?.suggestref?.current?.classList.add('active');
	refs?.latestref?.current?.classList.add('active');
	refs?.tworef?.current?.classList.add('active');
	refs?.threeref?.current?.classList.add('active');
};
