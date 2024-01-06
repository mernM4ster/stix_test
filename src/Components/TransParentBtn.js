const TransparentBtn = (props) => {
	const { children, func, className } = props;

	return (
		<div onClick={func} className={`w-full rounded-full border-2 border-black xxxs:p-1 xxs:p-2 xs:p-4 flex items-center justify-center beatrice-font xxxs:text-sm xxs:text-lg xs:text-2xl ${className}`}>
			{children}
		</div>
	);
}

export default TransparentBtn;