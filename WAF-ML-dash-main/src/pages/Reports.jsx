import Header from "../components/common/Header";  
import Generator from "../components/reports/generator";


  const Reports = () => { 
    return (
      <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Reports' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Generator />
			</main>
		</div>
    );
  }


  export default Reports;