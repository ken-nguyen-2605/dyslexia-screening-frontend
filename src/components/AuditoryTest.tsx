import { useEffect, useState } from "react";
import TestCard from "./TestCard";
import ProgressBar from "./ProgressBar";
import { useTestStep } from "../contexts/TestStepContext";

/* FREQUENCY */
import frequency_4_1 from "../assets/auditoryTest/Frequency/1_A_freq_easy_1.mp3";
import frequency_4_2 from "../assets/auditoryTest/Frequency/1_A_freq_easy_2.mp3";
import frequency_6_1 from "../assets/auditoryTest/Frequency/1_B_freq_medium_1.mp3";
import frequency_6_2 from "../assets/auditoryTest/Frequency/1_B_freq_medium_2.mp3";
import frequency_6_3 from "../assets/auditoryTest/Frequency/1_B_freq_medium_3.mp3";

/* LENGTH */
import length_4_1 from "../assets/auditoryTest/Length/3_E_length_easy_1_350.mp3";
import length_4_2 from "../assets/auditoryTest/Length/3_E_length_easy_2_437.mp3";
import length_6_1 from "../assets/auditoryTest/Length/3_F_length_medium_1_350.mp3";
import length_6_2 from "../assets/auditoryTest/Length/3_F_length_medium_2_437.mp3";
import length_6_3 from "../assets/auditoryTest/Length/3_F_length_medium_3_525.mp3";

/* RISE TIME */
import riseTime_4_1 from "../assets/auditoryTest/RiseTime/4_G_rise_easy_2_500_250_in.mp3";
import riseTime_4_2 from "../assets/auditoryTest/RiseTime/4_G_rise_easy_3_500_250_out.mp3";
import riseTime_6_1 from "../assets/auditoryTest/RiseTime/4_G_rise_easy_1_500_no.mp3";
import riseTime_6_2 from "../assets/auditoryTest/RiseTime/4_G_rise_easy_2_500_250_in.mp3";
import riseTime_6_3 from "../assets/auditoryTest/RiseTime/4_G_rise_easy_3_500_250_out.mp3";

/* RHYTHM */
import rhythm_4_1 from "../assets/auditoryTest/Rhythm/intervalRise_1_f_f_n_100.mp3";
import rhythm_4_2 from "../assets/auditoryTest/Rhythm/intervalRise_1_n_f_f_100.mp3";
import rhythm_6_1 from "../assets/auditoryTest/Rhythm/intervalRise_1_f_f_n_100.mp3";
import rhythm_6_2 from "../assets/auditoryTest/Rhythm/intervalRise_1_f_n_f_100.mp3";
import rhythm_6_3 from "../assets/auditoryTest/Rhythm/intervalRise_1_n_f_f_100.mp3";

const soundFiles: Record<string, { four: string[]; six: string[] }> = {
	frequency: {
		four: [frequency_4_1, frequency_4_2],
		six: [frequency_6_1, frequency_6_2, frequency_6_3],
	},
	length: {
		four: [length_4_1, length_4_2],
		six: [length_6_1, length_6_2, length_6_3],
	},
	rhythm: {
		four: [rhythm_4_1, rhythm_4_2],
		six: [rhythm_6_1, rhythm_6_2, rhythm_6_3],
	},
	rise: {
		four: [riseTime_4_1, riseTime_4_2],
		six: [riseTime_6_1, riseTime_6_2, riseTime_6_3],
	},
};

function playCardSound(cardType: string, cardQuantity: 4 | 6, soundId: number) {
	const files = soundFiles[cardType]?.[cardQuantity === 4 ? "four" : "six"];
	if (!files) return;
	const src = files[soundId];
	if (!src) return;
	console.log("Playing sound:", src);
	const audio = new Audio(src);
	audio.play();
}

function generateShuffledPairs(cardQuantity: number) {
	// Generate pairs: [0,0,1,1] for 4 cards, [0,0,1,1,2,2] for 6 cards
	const pairs = Array.from({ length: cardQuantity }, (_, idx) =>
		Math.floor(idx / 2)
	);

	// Fisher-Yates shuffle algorithm
	for (let i = pairs.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pairs[i], pairs[j]] = [pairs[j], pairs[i]];
	}
	return pairs;
}

interface Card {
	soundId: number;
	isVisible: boolean;
}

const AuditoryTest = () => {
	const { currentStep, goToNextStep, goToPreviousStep, steps } = useTestStep();

	// Extract current type and quantity from step
	const stepString = steps[currentStep] || "";
	const [cardType, cardQuantityString] = stepString.split("/");
	const cardQuantity = Number(cardQuantityString);

	const [cards, setCards] = useState<Card[]>([]);
	const [selected, setSelected] = useState<number[]>([]);
	const [lockBoard, setLockBoard] = useState(false);

	useEffect(() => {
		if (cardQuantity !== 4 && cardQuantity !== 6) return;
		const pairs = generateShuffledPairs(cardQuantity);
		setCards(pairs.map((soundId) => ({ soundId, isVisible: true })));
		setSelected([]);
		setLockBoard(false);
	}, [cardQuantity, currentStep]);

	// Match-check logic
	useEffect(() => {
		if (selected.length === 2) {
			setLockBoard(true);

			const [firstIdx, secondIdx] = selected;
			if (
				cards[firstIdx].soundId === cards[secondIdx].soundId &&
				firstIdx !== secondIdx
			) {
				setTimeout(() => {
					setCards((prev) =>
						prev.map((card, idx) =>
							idx === firstIdx || idx === secondIdx
								? { ...card, isVisible: false }
								: card
						)
					);
					setSelected([]);
					setLockBoard(false);
				}, 500);
			} else {
				setTimeout(() => {
					setSelected([]);
					setLockBoard(false);
				}, 500);
			}
		}
	}, [selected, cards]);

	// Go to next step if all gone
	useEffect(() => {
		if (cards.length && cards.every((card) => !card.isVisible)) {
			setTimeout(() => {
				goToNextStep();
			}, 600);
		}
	}, [cards]);

	const handleCardClick = (idx: number) => {
		if (lockBoard) return;
		if (!cards[idx].isVisible) return;
		if (selected.includes(idx)) return;

		playCardSound(cardType, cardQuantity as 4 | 6, cards[idx].soundId);

		if (selected.length === 0) {
			setSelected([idx]);
		} else if (selected.length === 1) {
			setSelected([selected[0], idx]);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h2 className="text-2xl font-bold">Auditory Test</h2>
			<ProgressBar />

			{(cardQuantity === 4 || cardQuantity === 6) && (
				<div
					className={`grid gap-6 ${
						cardQuantity === 4 ? "grid-cols-2" : "grid-cols-3"
					}`}
				>
					{cards.map((card, index) => (
						<TestCard
							key={index}
							label=""
							onClick={() => handleCardClick(index)}
							className={`
								transition-all duration-300
								${selected.includes(index) ? "scale-105 border-4 border-yellow-400" : ""}
								${!card.isVisible ? "opacity-0 transition-opacity duration-500" : "opacity-100"}
							`}
						>
							<span className="text-2xl">🔊</span>
						</TestCard>
					))}
				</div>
			)}

			{/* Navigation Buttons */}
			<div className="flex gap-4 mt-6">
				<button
					onClick={goToPreviousStep}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
					disabled={currentStep === 0}
				>
					Previous
				</button>
				<button
					onClick={goToNextStep}
					className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
				>
					Next
				</button>
			</div>
		</div>
	);
};


export default AuditoryTest;

