import Header from "../components/common/Header";
import Block from "../components/management/Block";
import Unblock from "../components/management/Unblock";

const Management = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Management' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Block />
				<Unblock />
				
			</main>
		</div>
	);
};
export default Management;
