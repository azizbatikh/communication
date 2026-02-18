'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Trophy, RotateCcw, BookOpen } from 'lucide-react'

interface Question {
  id: number
  topic: string
  question: string
  choices: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    topic: 'Marteau-pilon de Nasmyth',
    question: 'En quelle année le marteau-pilon à vapeur de Nasmyth a-t-il été inventé ?',
    choices: ['1820', '1848', '1873', '1901'],
    correct: 1,
    explanation:
      "Le marteau-pilon à vapeur fut inventé en 1848, marquant un tournant majeur de la révolution industrielle. Sa capacité à forger des pièces massives avec une précision remarquable en fit une machine emblématique de l'ère industrielle.",
  },
  {
    id: 2,
    topic: 'Marteau-pilon de Nasmyth',
    question: 'Pour quelle application principale le marteau-pilon à vapeur était-il utilisé ?',
    choices: [
      'Creuser des tunnels ferroviaires',
      'Couper des métaux fins',
      'Forger des pièces massives pour les machines marines et locomotives',
      'Pulvériser du minerai de charbon',
    ],
    correct: 2,
    explanation:
      "Le marteau-pilon forgeait des pièces de fer massives : roues de locomotives, blindages de navires, canons. Sa puissance alliée à sa précision remarquable en faisait un outil indispensable de la grande industrie du XIXe siècle.",
  },
  {
    id: 3,
    topic: "L'inventeur Senot",
    question: 'Dans quel domaine Senot a-t-il apporté sa principale contribution scientifique ?',
    choices: [
      'La chimie organique',
      'La mécanique de précision et les instruments de mesure',
      'La physique des ondes',
      "L'astronomie",
    ],
    correct: 1,
    explanation:
      "Senot s'est illustré dans la mécanique de précision, concevant des instruments de mesure d'une exactitude remarquable pour son époque. Ses travaux ont contribué à poser les bases du contrôle qualité industriel et des systèmes de mesure modernes.",
  },
  {
    id: 4,
    topic: 'Moteur Renault Gordini V6',
    question: 'En quelle année le moteur Renault Gordini V6 a-t-il été développé ?',
    choices: ['1965', '1969', '1973', '1978'],
    correct: 2,
    explanation:
      "Développé en 1973 par Amédée Gordini pour Renault, ce moteur V6 à 90° était destiné à la compétition automobile. Il représente un chef-d'œuvre de l'ingénierie mécanique française, alliant compacité et puissance exceptionnelle.",
  },
  {
    id: 5,
    topic: 'Moteur Renault Gordini V6',
    question: 'Quelle technologie de distribution caractérisait le moteur Gordini V6 ?',
    choices: [
      'Distribution à simple arbre à cames (SACT)',
      'Moteur électrique hybride',
      'Distribution à double arbre à cames en tête (DACT)',
      'Alimentation par carburateur unique',
    ],
    correct: 2,
    explanation:
      "Le moteur Gordini V6 utilisait une distribution à double arbre à cames en tête (DACT), une technologie avancée pour l'époque. Ce système permettait une gestion précise de l'ouverture des soupapes et des performances exceptionnelles en compétition.",
  },
  {
    id: 6,
    topic: 'Vérin Hydraulique Case',
    question: 'Sur quel principe physique repose le fonctionnement du vérin hydraulique ?',
    choices: [
      'La loi de Newton',
      'Le théorème de Pascal',
      "Le principe d'Archimède",
      "La loi d'Ohm",
    ],
    correct: 1,
    explanation:
      "Le vérin hydraulique repose sur le théorème de Pascal : une pression exercée sur un fluide se transmet intégralement dans toutes les directions. Ce principe permet de multiplier considérablement la force appliquée, rendant possible le terrassement de grandes masses.",
  },
  {
    id: 7,
    topic: 'Vérin Hydraulique Case',
    question: 'Quand le vérin hydraulique Case présenté au musée a-t-il été fabriqué ?',
    choices: ['1976-1977', '1986-1987', '1996-1997', '2006-2007'],
    correct: 2,
    explanation:
      "Le vérin hydraulique Case a été créé en 1996-1997. C'est un vérin à double effet constitué d'un tube avec une tige et un piston, alimenté alternativement en huile dans deux chambres pour produire des efforts considérables dans les engins de travaux publics.",
  },
]

function getScoreMessage(
  score: number,
  total: number
): { message: string; colorClass: string } {
  const ratio = score / total
  if (ratio === 1)
    return {
      message:
        "Parfait ! Vous maîtrisez totalement ces objets emblématiques du Musée des Arts et Métiers. Félicitations, vrai(e) expert(e) de la mécanique !",
      colorClass: 'text-yellow-600 dark:text-yellow-400',
    }
  if (ratio >= 0.75)
    return {
      message:
        "Excellent résultat ! Vous avez une très bonne connaissance de la mécanique et de ses grands principes. Continuez sur cette lancée !",
      colorClass: 'text-blue-600 dark:text-blue-400',
    }
  if (ratio >= 0.5)
    return {
      message:
        "Bien joué ! Vous maîtrisez les bases. Relisez les descriptions des objets pour aller encore plus loin dans votre compréhension !",
      colorClass: 'text-green-600 dark:text-green-400',
    }
  if (ratio >= 0.25)
    return {
      message:
        "Pas mal pour un début ! La mécanique recèle encore de nombreux secrets à découvrir. Retentez votre chance après une relecture !",
      colorClass: 'text-orange-600 dark:text-orange-400',
    }
  return {
    message:
      "Ne vous découragez pas ! Chaque grande découverte commence par la curiosité. Relisez les fiches des objets et réessayez — vous allez progresser !",
    colorClass: 'text-red-600 dark:text-red-400',
  }
}

export default function QCMGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'playing' | 'answered' | 'finished'>('playing')
  const [answers, setAnswers] = useState<boolean[]>([])

  const question = questions[currentQuestion]
  const total = questions.length

  function handleAnswer(index: number) {
    if (phase !== 'playing') return
    setSelectedAnswer(index)
    const correct = index === question.correct
    if (correct) setScore((prev) => prev + 1)
    setAnswers((prev) => [...prev, correct])
    setPhase('answered')
  }

  function handleNext() {
    if (currentQuestion + 1 >= total) {
      setPhase('finished')
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setPhase('playing')
    }
  }

  function handleRestart() {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setAnswers([])
    setPhase('playing')
  }

  if (phase === 'finished') {
    const { message, colorClass } = getScoreMessage(score, total)
    return (
      <Card className="p-12 text-center border-2">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        <h3 className="text-3xl font-bold mb-4">Quiz terminé !</h3>
        <p className="text-5xl font-bold text-accent mb-2">
          {score} / {total}
        </p>
        <p className="text-muted-foreground mb-6 font-mono text-sm">bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}</p>

        {/* Score breakdown */}
        <div className="flex justify-center gap-2 mb-8">
          {answers.map((correct, i) =>
            correct ? (
              <CheckCircle key={i} className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle key={i} className="w-6 h-6 text-red-500" />
            )
          )}
        </div>

        <p className={`text-lg font-semibold mb-8 text-pretty max-w-lg mx-auto ${colorClass}`}>
          {message}
        </p>

        <Button onClick={handleRestart} className="gap-2" size="lg">
          <RotateCcw className="w-4 h-4" />
          Recommencer le quiz
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-mono">
          Question {currentQuestion + 1} / {total}
        </span>
        <span className="text-sm font-mono text-accent">Score : {score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${(currentQuestion / total) * 100}%` }}
        />
      </div>

      {/* Topic badge */}
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-accent" />
        <span className="text-xs font-mono text-accent uppercase tracking-wider">
          {question.topic}
        </span>
      </div>

      {/* Question card */}
      <Card className="p-8 border-2">
        <h3 className="text-xl font-bold mb-6 text-balance">{question.question}</h3>

        <div className="space-y-3">
          {question.choices.map((choice, index) => {
            let extraClass = ''
            if (phase === 'answered') {
              if (index === question.correct) {
                extraClass =
                  ' !border-green-500 !bg-green-500/10 !text-green-700 dark:!text-green-400'
              } else if (index === selectedAnswer && index !== question.correct) {
                extraClass =
                  ' !border-red-500 !bg-red-500/10 !text-red-700 dark:!text-red-400'
              }
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left justify-start h-auto py-4 px-6 font-normal text-base transition-all hover:border-accent hover:bg-accent/5${extraClass}`}
                onClick={() => handleAnswer(index)}
                disabled={phase === 'answered'}
              >
                <span className="font-mono text-accent mr-3 shrink-0">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-pretty">{choice}</span>
                {phase === 'answered' && index === question.correct && (
                  <CheckCircle className="ml-auto w-5 h-5 text-green-500 shrink-0" />
                )}
                {phase === 'answered' &&
                  index === selectedAnswer &&
                  index !== question.correct && (
                    <XCircle className="ml-auto w-5 h-5 text-red-500 shrink-0" />
                  )}
              </Button>
            )
          })}
        </div>

        {/* Explanation */}
        {phase === 'answered' && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg border-l-4 border-l-accent animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm font-bold text-accent mb-1">Explication :</p>
            <p className="text-sm leading-relaxed text-pretty">{question.explanation}</p>
          </div>
        )}
      </Card>

      {/* Next button */}
      {phase === 'answered' && (
        <div className="flex justify-end animate-in fade-in">
          <Button onClick={handleNext} size="lg" className="gap-2">
            {currentQuestion + 1 >= total ? (
              <>
                <Trophy className="w-4 h-4" />
                Voir mon score
              </>
            ) : (
              <>
                Question suivante
                <span className="text-sm opacity-70">→</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
