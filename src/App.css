// App.js - Ensuring submit button is responsive until first submission
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

const BUTTON_STYLE = {
  backgroundColor: '#1890ff',
  border: 'none',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: 6,
  fontSize: 16,
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  margin: 5,
  outline: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
};

const INPUT_STYLE = {
  fontSize: 18,
  padding: '8px 12px',
  margin: '10px 5px',
  textAlign: 'center',
  border: '1px solid #ccc',
  borderRadius: 4,
  width: 'calc(60% - 22px)',
};

const SNAPPIER_TRANSITION_EXIT = { duration: 0.15, ease: "easeOut" };
const SNAPPIER_TRANSITION_TAP = { duration: 0.1, ease: "easeOut" };
const SNAPPIER_BACKGROUND_TRANSITION = 'background-color 0.15s ease';

export default function App() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState(null);
  const [maxNumStr, setMaxNumStr] = useState('10');
  const [totalCardsStr, setTotalCardsStr] = useState('20');
  const [maxNum, setMaxNum] = useState(10);
  const [totalCards, setTotalCards] = useState(20);
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [manualAnswerMode, setManualAnswerMode] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timedMode, setTimedMode] = useState(false);
  const [timeLimitStr, setTimeLimitStr] = useState('5');
  const [timeLimit, setTimeLimit] = useState(5);
  const [timeLeft, setTimeLeft] = useState(null);
  const [cardKey, setCardKey] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);
  const [direction, setDirection] = useState(null);
  const [retries, setRetries] = useState([]);

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const hasMarkedRef = useRef(false);
  const answerInputRef = useRef(null);

  const currentCard = useMemo(() => deck[currentIndex], [deck, currentIndex]);
  const isFinished = useMemo(() => currentIndex >= deck.length, [currentIndex, deck.length]);

  const clearTimers = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  const mark = useCallback((correct) => {
    if (hasMarkedRef.current) return; // This is the ultimate guard
    hasMarkedRef.current = true;      // Set immediately
    clearTimers();
    setDirection(correct ? 'right' : 'left');
    if (manualAnswerMode) { setShowFeedback(true); }
    else if (!correct) { setShowAnswer(true); }

    const animationDelay = manualAnswerMode && !correct ? 1250 : (manualAnswerMode && correct ? 500 : 0);
    setTimeout(() => { setAnimateOut(true); }, animationDelay);

    if (correct) { setCorrectCount((c) => c + 1); }
    else { setRetries((prev) => [...prev, currentCard]); setIncorrectCount((c) => c + 1); }
  }, [currentCard, clearTimers, manualAnswerMode]);

  const forceWrong = useCallback(() => {
    if (manualAnswerMode && !hasMarkedRef.current) { mark(false); }
    else if (!manualAnswerMode) {
        setShowAnswer(true);
        setTimeout(() => { if (!hasMarkedRef.current) mark(false); }, 1000);
    }
  }, [mark, manualAnswerMode]);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (step === 5 && manualAnswerMode && !isFinished && currentCard && answerInputRef.current && !hasMarkedRef.current) {
      answerInputRef.current.focus();
    }
  }, [step, manualAnswerMode, isFinished, currentCard, cardKey]);

  useEffect(() => {
    if (step !== 5 || !timedMode || (showAnswer && !manualAnswerMode) || (manualAnswerMode && hasMarkedRef.current) || !currentCard || isFinished) {
        clearTimers(); return;
    }
    setTimeLeft(timeLimit);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => { if (prev <= 1) { clearTimers(); forceWrong(); return 0; } return prev - 1; });
    }, 1000);
    timeoutRef.current = setTimeout(() => { clearTimers(); forceWrong(); }, timeLimit * 1000);
    return clearTimers;
  }, [step, timedMode, showAnswer, manualAnswerMode, currentCard, timeLimit, clearTimers, forceWrong, isFinished]);

  const generateDeck = useCallback(() => {
    const rand = (max) => Math.floor(Math.random() * (max + 1));
    const generateBiasedRandom = (currentMax) => {
        let num = rand(currentMax);
        if (currentMax > 1) { if (num === 0 || num === 1) { if (Math.random() < 0.75) { num = rand(currentMax); } } }
        return num;
    };
    const newDeck = [];
    while (newDeck.length < totalCards) {
      let a, b;
      switch (mode) {
        case 'add': a = generateBiasedRandom(maxNum); b = generateBiasedRandom(maxNum); newDeck.push({ question: `${a} + ${b}`, answer: a + b }); break;
        case 'sub': a = generateBiasedRandom(maxNum); b = generateBiasedRandom(maxNum); if (a < b) [a, b] = [b, a]; newDeck.push({ question: `${a} - ${b}`, answer: a - b }); break;
        case 'mul': a = generateBiasedRandom(maxNum); b = generateBiasedRandom(maxNum); newDeck.push({ question: `${a} × ${b}`, answer: a * b }); break;
        case 'div':
          let bCandidate; if (maxNum === 0) { bCandidate = 0; } else { bCandidate = generateBiasedRandom(maxNum - 1); }
          b = bCandidate + 1; const maxFactor = Math.floor(maxNum / b); const multiplier = generateBiasedRandom(maxFactor); a = b * multiplier;
          newDeck.push({ question: `${a} ÷ ${b}`, answer: a / b }); break;
        default: break;
      }
    }
    setDeck(newDeck); setCurrentIndex(0); setShowAnswer(false); setCorrectCount(0); setIncorrectCount(0);
    setTimeLeft(timedMode ? timeLimit : null); setUserAnswer(''); setShowFeedback(false);
    setDirection(null); setCardKey(key => key + 1); setAnimateOut(false); setRetries([]);
    hasMarkedRef.current = false; // Ensure this is reset for a new deck
  }, [mode, totalCards, maxNum, timedMode, timeLimit]);

  const onAnimationComplete = useCallback(() => {
    if (!animateOut) return;
    setCurrentIndex((prev) => prev + 1);
    setShowAnswer(false); setShowFeedback(false); setUserAnswer('');
    setDirection(null); setAnimateOut(false);
    setCardKey((prev) => prev + 1); hasMarkedRef.current = false; // Ensure this is reset for the next card
  }, [animateOut]);

  const exitX = useMemo(() => { if (!animateOut) return 0; return direction === 'left' ? -350 : 350; }, [animateOut, direction]);

  const handleCardClick = () => {
    if (manualAnswerMode || showAnswer || hasMarkedRef.current) return;
    setShowAnswer(true); if (timedMode) clearTimers();
  };

  const handleDragEnd = (event, info) => {
    if (manualAnswerMode || !showAnswer || hasMarkedRef.current) return;
    const { offset, velocity } = info; const swipeThreshold = 60; const swipeVelocityThreshold = 150;
    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > swipeVelocityThreshold) { if (offset.x > 0) mark(true); else mark(false); }
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    // console.log('handleSubmitAnswer called. hasMarkedRef.current:', hasMarkedRef.current); // For debugging
    if (!currentCard || hasMarkedRef.current) {
      // console.log('Submit guarded.'); // For debugging
      return;
    }
    const isCorrect = parseInt(userAnswer, 10) === currentCard.answer;
    mark(isCorrect); // mark() will set hasMarkedRef.current = true
    if (timedMode) clearTimers();
  };

  const NextButton = ({ onClickAction, children = "Next" }) => <button style={BUTTON_STYLE} onClick={onClickAction}>{children}</button>;
  const StartButton = ({ onClickAction, children = "Start" }) => <button style={BUTTON_STYLE} onClick={onClickAction}>{children}</button>;
  
  // SubmitButton no longer needs 'disabled' prop as the form unmounts
  const SubmitButton = ({ children = "Submit" }) => (
    <button type="submit" style={{ ...BUTTON_STYLE, backgroundColor: '#52c41a' }}>
      {children}
    </button>
  );

  // --- Render Steps ---
  if (step === 0) {
    return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>Welcome to the Flynn Family Flash Card App!</h2> <StartButton onClickAction={() => setStep(1)}>Begin</StartButton> </div> );
  }
  if (step === 1) {
    return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>Select Mode</h2> {['add', 'sub', 'mul', 'div'].map((m) => ( <button key={m} style={BUTTON_STYLE} onClick={() => { setMode(m); setStep(2); }}> {m === 'add' ? 'Addition' : m === 'sub' ? 'Subtraction' : m === 'mul' ? 'Multiplication' : 'Division'} </button> ))} </div> );
  }
  if (step === 2) {
    return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>Highest number?</h2> <input type="number" value={maxNumStr} onChange={e => setMaxNumStr(e.target.value)} /> <div><NextButton onClickAction={() => { setMaxNum(parseInt(maxNumStr, 10) || 10); setStep(3); }} /></div> </div> );
  }
  if (step === 3) {
    return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>How many cards?</h2> <input type="number" value={totalCardsStr} onChange={e => setTotalCardsStr(e.target.value)} /> <div><NextButton onClickAction={() => { setTotalCards(parseInt(totalCardsStr, 10) || 20); setStep(3.5); }} /></div> </div> );
  }
  if (step === 3.5) {
    return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>How do you want to answer?</h2> <button style={BUTTON_STYLE} onClick={() => { setManualAnswerMode(false); setStep(4); }}>Flip Card to Reveal</button> <button style={BUTTON_STYLE} onClick={() => { setManualAnswerMode(true); setStep(4); }}>Type in the Answer</button> </div> );
  }
  if (step === 4) {
    return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>Timed Mode?</h2> <button style={BUTTON_STYLE} onClick={() => { setTimedMode(false); generateDeck(); setStep(5); }}>No</button> <button style={BUTTON_STYLE} onClick={() => {setTimedMode(true); setStep(4.5)}}>Yes</button> </div> );
  }
  if (step === 4.5) {
      return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>Seconds to answer:</h2> <input type="number" value={timeLimitStr} onChange={e => setTimeLimitStr(e.target.value)} /> <div><StartButton onClickAction={() => { setTimeLimit(parseInt(timeLimitStr, 10) || 5); generateDeck(); setStep(5); }} /></div> </div> );
  }
  if (step === 5 && isFinished) {
    return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>All done!</h2> <p>Correct: {correctCount} | Incorrect: {incorrectCount}</p> {retries.length > 0 && ( <button style={BUTTON_STYLE} onClick={() => { setDeck(retries); setRetries([]); setCurrentIndex(0); setShowAnswer(false); setDirection(null); setCardKey(key => key + 1); setAnimateOut(false); hasMarkedRef.current = false; setCorrectCount(0); setIncorrectCount(0); setUserAnswer(''); setShowFeedback(false); }}>Retry Missed</button> )} <button style={BUTTON_STYLE} onClick={() => { setStep(1); setDeck([]); setMode(null); setManualAnswerMode(false); }}>Start Over</button> </div> );
  }

  if (step === 5 && currentCard && !isFinished) {
    return (
      <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
        <h1>Math Flashcards</h1>
        {timedMode && timeLeft !== null && !hasMarkedRef.current && (
          <div style={{ fontSize: 20, marginBottom: 10, color: timeLeft <= 3 && timeLeft > 0 ? 'red' : 'black' }}>⏱ {timeLeft}s</div>
        )}
        <div onClick={handleCardClick} style={{ position: 'relative', cursor: (!manualAnswerMode && !showAnswer && !hasMarkedRef.current) ? 'pointer' : 'default' }}>
          <div style={{ position: 'absolute', inset: 0, background: animateOut && direction === 'left' ? 'rgba(255,0,0,0.25)' : animateOut && direction === 'right' ? 'rgba(0,255,0,0.25)' : 'transparent', borderRadius: 12, zIndex: 0, transition: SNAPPIER_BACKGROUND_TRANSITION }} />
          <motion.div
            key={cardKey}
            drag={!manualAnswerMode && showAnswer && !hasMarkedRef.current ? 'x' : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.1} onDragEnd={handleDragEnd}
            animate={{ x: exitX, opacity: animateOut ? 0 : 1 }} transition={SNAPPIER_TRANSITION_EXIT} onAnimationComplete={onAnimationComplete}
            style={{
              margin: '20px auto', width: 300, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center',
              fontSize: 32, border: '4px solid #555', borderRadius: 12, backgroundColor: '#fffbe6', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              userSelect: 'none', zIndex: 1, position: 'relative',
              cursor: (!manualAnswerMode && showAnswer && !hasMarkedRef.current) ? 'grab' : (!manualAnswerMode && !showAnswer && !hasMarkedRef.current) ? 'pointer' : 'default',
              touchAction: (!manualAnswerMode && showAnswer && !hasMarkedRef.current) ? 'none' : 'auto',
            }}
            whileTap={(!manualAnswerMode && !hasMarkedRef.current && (showAnswer || !manualAnswerMode)) ? { scale: showAnswer ? 1.03 : 1.05, transition: SNAPPIER_TRANSITION_TAP } : {}}
          >
            {manualAnswerMode && showFeedback && !animateOut && direction === 'left' ? (
                <div style={{ textAlign: 'center', lineHeight: '1.4', padding: '10px' }}>
                  <div style={{ color: 'red', fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>Incorrect</div>
                  <div style={{ fontSize: '22px' }}>Correct Answer: {currentCard.answer}</div>
                </div>
            ) : manualAnswerMode && showFeedback && !animateOut && direction === 'right' ? (
                 <div style={{ textAlign: 'center', color: 'green', fontSize: '28px', fontWeight: 'bold' }}>Correct!</div>
            ) : (!manualAnswerMode && showAnswer) ? ( currentCard.answer ) : ( currentCard.question )}
          </motion.div>
        </div>

        {/* Form is rendered only if manual mode is active AND card has not been marked yet */}
        {manualAnswerMode && !hasMarkedRef.current && (
          <form onSubmit={handleSubmitAnswer} style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
              ref={answerInputRef} type="number" style={INPUT_STYLE} value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)} placeholder="Your answer"
              // No 'disabled' prop needed here as the entire form will unmount
            />
            {/* SubmitButton is always rendered 'active' here because if hasMarkedRef.current were true, this whole block wouldn't render */}
            <SubmitButton />
          </form>
        )}

        {!manualAnswerMode && showAnswer && !hasMarkedRef.current && !animateOut && (
          <div style={{ marginTop: 20 }}>
            <button onClick={() => mark(false)} style={{ ...BUTTON_STYLE, backgroundColor: '#ff4d4f' }}>Wrong</button>
            <button onClick={() => mark(true)} style={{ ...BUTTON_STYLE, backgroundColor: '#52c41a' }}>Right</button>
          </div>
        )}
      </div>
    );
  }

  return ( <div style={{ padding: 20, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}> <h1>Math Flashcards</h1> <h2>Loading...</h2> </div> );
}