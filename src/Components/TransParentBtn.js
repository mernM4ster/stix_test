const TransparentBtn = (props) => {
	const { children, func, className } = props;

	return (
		<div onClick={func} className={`w-full rounded-full border-2 border-black p-4 flex items-center justify-center beatrice-font text-2xl ${className}`}>
			{children}
		</div>
	);
}

export default TransparentBtn;