const PurpleBtn = (props) => {
	const { children, func } = props;

	return (
		<div onClick={func} className="w-full rounded-full bg-[#6e66bc] p-4 flex items-center justify-center beatrice-font text-white text-2xl text-center">
			{children}
		</div>
	);
}

export default PurpleBtn;