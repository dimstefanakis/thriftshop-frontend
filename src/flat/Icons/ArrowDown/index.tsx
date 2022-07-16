interface IconProps extends React.SVGAttributes<SVGElement> {}

function ArrowDown(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" height="30px" width="20px" fill="white" {...props}>
      <path d="M10.94 24.06a1.5 1.5 0 002.12 0l9.547-9.545a1.5 1.5 0 10-2.122-2.122L12 20.88l-8.485-8.486a1.5 1.5 0 10-2.122 2.122l9.546 9.546zM10.5 0v23h3V0h-3z"></path>
    </svg>
  );
}

export default ArrowDown;
