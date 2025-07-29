const VisualTestInstruction = ({ onStartTest }: { onStartTest: () => void }) => (
  <form
    className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-4 shadow-lg max-w-md w-full mx-auto mt-10"
    onSubmit={e => { e.preventDefault(); onStartTest(); }}
  >
    <h2 className="text-2xl text-teal-600 font-bold text-center mb-1">
      Visual Test Instruction
    </h2>
    <div className="text-teal-600 font-medium mb-2 text-center text-lg">
      Step 3 of 4: <span className="text-gray-700 font-normal">Visual features</span>
    </div>
    <div className="w-full h-1.5 bg-teal-100 rounded-full mb-4">
      <div className="bg-teal-400 h-1.5 rounded-full transition-all" style={{ width: "75%" }} />
    </div>
    <div className="flex flex-col items-center">
      {/* Eyes Icon */}
      <div className="my-2">
        <span className="inline-block bg-teal-50 rounded-full p-3">
          {/* Simple eyes SVG */}
          <svg width="38" height="20" viewBox="0 0 38 20">
            <ellipse cx="11" cy="10" rx="8" ry="9" fill="#fff" stroke="#212121" strokeWidth="2"/>
            <ellipse cx="27" cy="10" rx="8" ry="9" fill="#fff" stroke="#212121" strokeWidth="2"/>
            <ellipse cx="11" cy="13" rx="3" ry="4" fill="#212121"/>
            <ellipse cx="27" cy="13" rx="3" ry="4" fill="#212121"/>
          </svg>
        </span>
      </div>
      <div className="font-bold text-black text-center mt-2 mb-2">
        Read carefully to the instructions.
      </div>
      <div className="text-center mb-2 text-gray-700">
        You will play a series of memory games using images. Your goal is to find and match the images.
      </div>
      <div className="text-black font-bold mb-1">INSTRUCTIONS</div>
      <div className="text-gray-800 text-center text-sm">
        First, you&apos;ll see a <span className="font-bold text-teal-600">target visual cue for 3 seconds—memorize it</span>.
        Next, click on the target among several images
        <span className="font-bold text-teal-600"> as many times as you can in 15 seconds</span>.
        The positions will shuffle after each click.
        Each stage has two rounds with increasing number of images. Good luck!
      </div>
    </div>
    <button
      type="submit"
      className="bg-teal-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-teal-600 transition focus:ring-2 focus:ring-teal-200 focus:outline-none"
    >
      Start Visual Test
    </button>
  </form>
);

export default VisualTestInstruction;