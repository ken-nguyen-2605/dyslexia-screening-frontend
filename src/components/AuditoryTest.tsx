import { useEffect, useState } from "react";
import { useAuditoryTestStep } from "../contexts/AuditoryTestStepContext";
import TestCard from "./TestCard";
import ProgressBar from "./ProgressBar";

// Helper to create shuffled pairs
function generateShuffledPairs(cardQuantity: number) {
	// Create array of pairs: [0,1,0,1] for 4, [0,1,2,0,1,2] for 6 etc
	const pairs = Array.from({ length: cardQuantity }, (_, idx) =>
		Math.floor(idx / 2)
	);
	// Optionally replace 0,1,2... with 'A','B', etc for more visual effect
	// const soundIds = ['A','B','C','D'];
	// const pairs = Array.from({length: cardQuantity}, (_, idx) => soundIds[Math.floor(idx/2)]);
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
	const { currentStep, goToNextStep, steps } = useAuditoryTestStep();

	const stepString = steps[currentStep] || "";
	const [type, cardQuantityString] = stepString.split("/");
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
				// Correct match: set both to invisible after delay
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
				}, 500); // brief reveal before hiding
			} else {
				// Wrong match: reset selection after delay
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
	}, [cards]); // Dependency array updated

	const handleCardClick = (idx: number) => {
		if (lockBoard) return;
		if (!cards[idx].isVisible) return;
		if (selected.includes(idx)) return;

		if (selected.length === 0) {
			setSelected([idx]);
		} else if (selected.length === 1) {
			setSelected([selected[0], idx]);
		}
		// Don't allow selecting more than 2 at once
	};

	return (
		<div className="flex flex-col items-center justify-center">
			{/* Title and type */}
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
							label={
								selected.includes(index) && card.isVisible
									? `Card ${index + 1}`
									: ""
							}
							onClick={() => handleCardClick(index)}
							className={!card.isVisible ? "invisible" : ""}
							// add similar style if card shouldn't be clickable!
						>
							{selected.includes(index) ? (
								<span className="text-2xl">
									{String.fromCharCode(65 + card.soundId)}
								</span>
							) : (
								<span className="text-2xl">🔊</span>
							)}
						</TestCard>
					))}
				</div>
			)}
		</div>
	);
};

export default AuditoryTest;
