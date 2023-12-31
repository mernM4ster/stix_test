const PurpleBtn = (props) => {
	const { children, func } = props;

	return (
		<div onClick={func} className="w-full rounded-full bg-[#6e66bc] xxxs:p-1 xxs:p-2 xs:p-4 flex items-center justify-center beatrice-font text-white xxxs:text-sm xxs:text-lg xs:text-2xl text-center">
			{children}
		</div>
	);
}

export default PurpleBtn;