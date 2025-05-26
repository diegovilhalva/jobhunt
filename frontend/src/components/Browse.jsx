import Job from "./Job";
import Navbar from "./shared/Navbar";

const dummyJobs = [1, 2, 3, 4, 5]; // Exemplo de lista — substitua com seus dados reais

const Browse = () => {
  return (
    <div>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Search Results ({dummyJobs.length})
        </h1>

        {dummyJobs.length === 0 ? (
          <p className="text-gray-600 text-lg">No jobs found. Try adjusting your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyJobs.map((job, index) => (
              <Job key={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
