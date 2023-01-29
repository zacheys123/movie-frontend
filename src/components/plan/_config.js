export const setFree = (refs) => {
	refs?.tworef?.current?.classList.add('remove-active');
	refs?.threeref?.current?.classList.add('remove-active');
};
export const setAmateur = (refs) => {
	refs?.tworef?.current?.classList.add('remove-active');
	refs?.threeref?.current?.classList.add('remove-active');
};
export const setWorld = (refs) => {
	refs?.tworef?.current?.classList.add('active');
	refs?.threeref?.current?.classList.add('active');
};
export const setPremium = (refs) => {
	refs?.tworef?.current?.classList.add('active');
	refs?.threeref?.current?.classList.add('active');
};
