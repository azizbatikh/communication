'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Cog, Wrench, Lightbulb, ChevronRight, X } from 'lucide-react'
import QCMGame from '@/components/qcm-game'

export default function Page() {
  const [selectedObject, setSelectedObject] = useState<string | null>(null)
  const [selectedInventor, setSelectedInventor] = useState(false)

  const objects = [
    {
      id: 'marteau-pilon-nasmyth',
      title: 'Le Marteau-pilon à vapeur de Nasmyth',
      year: '1848',
      description: 'Machine révolutionnaire combinant la puissance du marteau hydraulique et la souplesse du marteau à bras, utilisée pour forger les pièces de fer des machines marines.',
      details: 'Inventé par James Nasmyth en 1848, le marteau-pilon à vapeur est une innovation majeure de la révolution industrielle. Cette machine combine la puissance du marteau hydraulique avec la souplesse et la précision du marteau à bras. Elle permettait de forger des pièces de fer massives pour les machines marines, les roues de locomotives, les blindages de navires et les canons. Très maniable malgré sa force énorme, elle peut à la fois enfoncer un clou dans du bois tendre ou pénétrer une masse de fer chaud avec une précision remarquable.',
      link: 'Le marteau-pilon à vapeur préfigure les systèmes de contrôle de force modernes utilisés en robotique industrielle. Les algorithmes de contrôle PID (Proportionnel, Intégral, Dérivé) qui régulent la force et la précision des robots industriels actuels s\'inspirent directement de ce mécanisme de régulation mécanique inventé par Nasmyth.',
      image: '/images/marteauPilonnasmyth.jpg'
    },
    {
      id: 'moteur-renault-gordini',
      title: 'Le Moteur Renault Gordini V6',
      year: '1973',
      description: 'Moteur V6 à 90° développé par Amédée Gordini pour Renault, symbole de l\'excellence mécanique française en compétition automobile.',
      details: 'Le moteur Renault Gordini V6, développé en 1973, est un chef-d\'œuvre de l\'ingénierie mécanique française. Conçu par Amédée Gordini pour Renault, ce moteur V6 à 90° était destiné à la compétition automobile. Il combine une architecture compacte avec une puissance exceptionnelle, utilisant des technologies avancées pour l\'époque : distribution à double arbre à cames en tête, injection mécanique, et un système de refroidissement optimisé. Ce moteur a propulsé les voitures de course Renault à de nombreuses victoires, démontrant l\'excellence de la mécanique française.',
      link: 'Les moteurs modernes utilisent des systèmes de gestion électronique (ECU) qui optimisent en temps réel le mélange air-carburant, l\'allumage et la distribution. Ces systèmes embarqués sont l\'évolution logique de la mécanique de précision développée par Gordini, mais pilotés par des microprocesseurs et des algorithmes d\'optimisation plutôt que par des réglages mécaniques fixes.',
      image: '/images/moteurv6.jpg'
    },
    {
      id: 'verin-hydraulique-case',
      title: 'Le Vérin Hydraulique Case',
      year: '1996',
      description: 'Vérin hydraulique à double effet utilisé dans les engins de travaux publics, fonctionnant selon le théorème de Pascal.',
      details: 'Le vérin hydraulique Case, créé en 1996-1997, est un vérin à double effet constitué d\'un tube avec une tige et un piston. Alimenté alternativement en huile dans deux chambres, il crée des efforts considérables pour le terrassement et les travaux publics. Son principe remonte aux grues hydrauliques de William Armstrong (1850) et au théorème de Pascal. Ce vérin illustre la continuité entre les principes mécaniques fondamentaux et les applications modernes de l\'ingénierie.',
      link: 'Les systèmes hydrauliques modernes utilisent des microcontrôleurs et des capteurs de pression pour réguler précisément la force exercée. Ces systèmes embarqués sont l\'évolution logique du vérin hydraulique, combinant la puissance mécanique avec l\'intelligence électronique pour un contrôle optimal des engins de travaux publics.',
      image: '/images/verin_hydraulique.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        {/* Hero image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/30">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Cog className="w-96 h-96 animate-spin-slow" />
          </div>
          <span className="absolute top-4 right-4 text-xs text-muted-foreground/60 bg-background/80 px-3 py-1.5 rounded">
            {'Photo panoramique du musée'}
          </span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 py-24 px-6">
          <div className="flex items-center gap-3 mb-6">
            <Cog className="w-8 h-8 text-accent animate-spin-slow" />
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Musée des Arts et Métiers</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Les Merveilles de la Mécanique
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl text-pretty">
            {'Une exploration immersive de l\'ingéniosité humaine à travers les chefs-d\'œuvre mécaniques qui ont façonné notre monde moderne'}
          </p>
        </div>
      </section>

      {/* Objects Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Wrench className="w-6 h-6 text-accent" />
            <h2 className="text-4xl font-bold">Trois Objets Emblématiques</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {objects.map((object) => (
              <Card 
                key={object.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-accent group"
                onClick={() => setSelectedObject(object.id)}
              >
                {/* Photo de l'objet */}
                <div className="h-56 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                  {object.image ? (
                    <img 
                      src={object.image} 
                      alt={object.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Cog className="w-24 h-24 text-muted-foreground/20 group-hover:rotate-180 transition-transform duration-700" />
                  )}
                  <span className="absolute bottom-2 right-2 text-xs text-muted-foreground/60 bg-background/80 px-2 py-1 rounded z-10">
                    Photo du musée Arts et Métiers
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-sm font-mono text-accent">{object.year}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-balance">{object.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{object.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inventor Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Lightbulb className="w-6 h-6 text-accent" />
            <h2 className="text-4xl font-bold">Portrait d'un Génie</h2>
          </div>
          
          <Card className="p-12 md:p-16 border-2">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-2">Senot</h3>
                <p className="text-xl text-accent mb-2 font-semibold">{"l'horloger de l'industrie"}</p>
                <p className="text-lg text-muted-foreground mb-6 font-mono">XIXe siècle</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    {"Au XIXe siècle, dans les ateliers français, un ingénieur nommé Senot se pose une question simple mais révolutionnaire : comment être sûr qu'une pièce mesure exactement ce qu'elle devrait mesurer ?"}
                  </p>
                  <p className="text-pretty">
                    {"Imaginez l'époque : on fabrique des machines à la main, chaque artisan a son propre coup d'œil, ses propres outils approximatifs. Résultat ? Deux vis « identiques » ne le sont jamais vraiment. Impossible de remplacer une pièce cassée sans tout refabriquer sur mesure."}
                  </p>
                  <p className="text-pretty">
                    {"Senot invente alors des instruments de mesure d'une précision inédite. Pas de « à peu près », pas de « ça devrait aller ». Ses outils disent la vérité au millimètre près. Grâce à lui, pour la première fois, on peut produire des pièces vraiment interchangeables : une roue dentée fabriquée à Paris s'emboîte parfaitement dans un mécanisme fait à Lyon."}
                  </p>
                  <p className="font-semibold text-foreground">{"Et l'informatique dans tout ça ?"}</p>
                  <p className="text-pretty">
                    {"Ce souci obsessionnel de la précision absolue, c'est exactement l'ADN de l'informatique. Un ordinateur, au fond, c'est une machine qui ne tolère aucun flou : un bit est soit 0, soit 1. Jamais « presque 1 » ou « à peu près 0 »."}
                  </p>
                  <p className="text-pretty">
                    {"Sans le savoir, Senot a posé les fondations mentales de notre monde numérique : la rigueur n'est pas une option, c'est la condition pour que tout fonctionne."}
                  </p>
                </div>
                <Button
                  onClick={() => setSelectedInventor(true)}
                  className="mt-8"
                >
                  {'En savoir plus sur Senot'}
                </Button>
              </div>
              <div className="bg-gradient-to-br from-secondary to-muted rounded-lg overflow-hidden relative">
                {/* Photo placeholder for Senot portrait */}
                <div className="aspect-[3/4] flex items-center justify-center relative">
                  <img
                    src="/images/blaisepascal.webp"
                    alt="Senot"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <Lightbulb className="w-32 h-32 text-accent opacity-30 absolute" />
                </div>
                <span className="absolute bottom-4 right-4 text-xs text-muted-foreground/60 bg-background/80 px-3 py-1.5 rounded">
                  {'tour à vis de sénot'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Reflection Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-balance">
            {"De la forge à l'écran : quand les machines du XIXe préfigurent le code"}
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-pretty">
            {"Ces vieilles machines rouillées que vous voyez dans les musées ? Elles sont l'ADN de votre ordinateur."}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 border-2 border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-mono text-accent">01</span>
                <h3 className="text-xl font-bold">{"Précision : zéro tolérance"}</h3>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="text-pretty">
                  {"Les instruments de Senot ne pardonnaient rien : 1 millimètre d'écart, et la pièce est bonne pour la ferraille. Le marteau-pilon de Nasmyth devait frapper pile au même endroit, cycle après cycle."}
                </p>
                <p className="text-pretty">
                  {"Aujourd'hui ? Même combat. Un seul bit qui se trompe — un 0 qui devient 1 — et tout votre programme plante. Pas de « à peu près » en binaire. Cette obsession du millimètre est devenue l'obsession du bit : l'erreur n'est pas une option."}
                </p>
              </div>
            </Card>

            <Card className="p-8 border-2 border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-mono text-accent">02</span>
                <h3 className="text-xl font-bold">{"Automatisation : plus besoin de muscles"}</h3>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="text-pretty">
                  {"Le vérin hydraulique, c'était magique en 1850 : une simple pression d'huile remplaçait dix hommes à la manivelle. Signal envoyé → machine obéit. Point."}
                </p>
                <p className="text-pretty">
                  {"Vos boucles "}
                  <code className="text-accent font-mono text-sm">for</code>
                  {" et "}
                  <code className="text-accent font-mono text-sm">while</code>
                  {" ? C'est exactement pareil. Au lieu de copier-coller 1000 fois la même ligne de code, vous écrivez une boucle. Signal envoyé → programme obéit. L'automate mécanique était déjà un algorithme, juste fait d'acier au lieu de silicium."}
                </p>
              </div>
            </Card>

            <Card className="p-8 border-2 border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-mono text-accent">03</span>
                <h3 className="text-xl font-bold">{"Standardisation : parler le même langage"}</h3>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="text-pretty">
                  {"Le moteur Gordini utilisait des boulons de taille standard. Génie ! Vis cassée ? Tu la remplaces sans refabriquer toute la machine."}
                </p>
                <p className="text-pretty">
                  {"Sur Internet ? Même principe. ASCII, Unicode, TCP/IP : ce sont les « boulons standard » du numérique. Sans eux, votre email Gmail ne pourrait pas parler au serveur Outlook, votre iPhone ne comprendrait pas votre PC. La standardisation, c'est ce qui fait tenir le monde connecté."}
                </p>
              </div>
            </Card>

            <Card className="p-8 border-2 border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-mono text-accent">04</span>
                <h3 className="text-xl font-bold">{"Logique & répétabilité : toujours le même geste"}</h3>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="text-pretty">
                  {"Un marteau-pilon, c'est bête : il lève le bras, il frappe, il recommence. Même mouvement, même résultat, 10 000 fois de suite sans se poser de questions."}
                </p>
                <p className="text-pretty">
                  {"Un algorithme ? Pareil. Tu lui donnes les mêmes données en entrée, il te crache toujours la même sortie. Pas d'humeur, pas de fatigue, juste de la logique pure. Le marteau suivait un algorithme mécanique ; votre code suit un algorithme numérique."}
                </p>
              </div>
            </Card>
          </div>
          <div className="mt-8 p-6 bg-accent/10 rounded-lg border-l-4 border-l-accent">
            <p className="text-base leading-relaxed text-pretty text-accent">
              <span className="font-bold">{"Finalement : "}</span>
              {"Quand vous déboguez votre Python à 3h du matin, vous êtes dans la lignée directe de Senot qui ajustait ses instruments à la chandelle. Même rigueur, même logique, juste des outils différents. L'informatique n'est pas sortie de nulle part — elle vient de ces ateliers enfumés du XIXe siècle où on a appris, pour la première fois, à penser en précision absolue."}
            </p>
          </div>
        </div>
      </section>

      {/* Anecdotes */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Anecdotes de Visite</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden border-l-4 border-l-accent">
              {/* Photo du piano mécanique */}
              <div className="h-48 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/images/piano.jpg"
                  alt="Piano mécanique du musée Arts et Métiers"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="absolute bottom-2 right-2 text-xs text-muted-foreground/60 bg-background/80 px-2 py-1 rounded z-10">
                  Piano mécanique - Musée Arts et Métiers
                </span>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold mb-4 text-balance">{"Le Piano Mécanique : Une Scène Déconcertante"}</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    {"Dans notre partie du musée, il y avait un piano qui ne semblait pas être un objet d'exposition — pas de cordons de sécurité, pas de panneau explicatif, rien qui indique « ne pas toucher »."}
                  </p>
                  <p className="text-pretty">
                    {"Safaa s'en approche, intriguée. Immédiatement, une dame du personnel lui crie dessus, l'interdisant formellement de s'en approcher. Safaa recule, surprise et un peu gênée."}
                  </p>
                  <p className="text-pretty">
                    {"Quelques minutes plus tard, Mohammed s'approche du même piano. Il va même plus loin : il essaie carrément de l'ouvrir. Personne ne dit rien. Pas un regard, pas un mot."}
                  </p>
                  <p className="font-semibold text-foreground">
                    {"Même objet, même lieu, deux réactions complètement opposées."}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden border-l-4 border-l-accent">
              {/* Photo de la symphonie d'engrenages */}
              <div className="h-48 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/images/symphonieangenage.jpg"
                  alt="Symphonie d'engrenages du musée Arts et Métiers"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="absolute bottom-2 right-2 text-xs text-muted-foreground/60 bg-background/80 px-2 py-1 rounded z-10">
                  Symphonie d'engrenages - Musée Arts et Métiers
                </span>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold mb-4 text-balance">La Symphonie Mécanique</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {'Dans la salle des automates, une démonstration a fait résonner simultanément plusieurs mécanismes : cliquetis d\'engrenages, carillons, mécanismes d\'horlogerie. Cette "symphonie mécanique" créait une ambiance sonore unique, presque musicale. Une visiteuse a sorti son téléphone pour enregistrer, créant un contraste saisissant entre l\'ancien et le moderne.'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* IT Link Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            {'Lien avec l\'Informatique'}
          </h2>
          <Card className="p-12 bg-primary text-primary-foreground border-0">
            <p className="text-lg leading-relaxed mb-6 text-pretty">
              {'En visitant ces machines, on a réalisé que l\'informatique n\'est pas née d\'un coup : elle prolonge une longue histoire de précision et d\'automatisation. Les instruments de Senot, conçus pour tailler des vis avec une exactitude remarquable, nous rappellent directement les notions vues dans nos cours de BUT : logique, rigueur, répétabilité.'}
            </p>
            <p className="text-lg leading-relaxed font-semibold text-pretty">
              {'Comme ces mécaniciens cherchaient à rendre leurs outils fiables et standardisés, on apprend aujourd\'hui à construire des systèmes numériques qui fonctionnent avec la même exigence. Cette visite nous montre que derrière chaque algorithme, il y a d\'abord une idée mécanique : mesurer, contrôler, automatiser.'}
            </p>
          </Card>
        </div>
      </section>

      {/* Réflexion esthétique */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Lightbulb className="w-6 h-6 text-accent" />
            <h2 className="text-4xl font-bold">{"Réflexion : l'utile et le beau"}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                {"En parcourant la section mécanique, on a remarqué quelque chose : ces machines étaient belles. Pas juste fonctionnelles — belles. Gravures sur les cylindres, ornements en cuivre, acier bien poli. Même les pièces cachées avaient des décorations (voir photos)."}
              </p>
              <p className="text-pretty">
                {"Au XIXe siècle, fabriquer une machine prenait des mois. Alors autant que ce soit beau, que l'objet montre le savoir-faire de celui qui l'a créé."}
              </p>
              <p className="text-pretty">
                {"Aujourd'hui ? On fait le minimum. Un boîtier gris, des câbles, tant que ça marche c'est bon. Nos ordinateurs sont mille fois plus puissants, mais ils n'ont aucune âme."}
              </p>
              <p className="text-pretty font-semibold text-foreground">
                {"On a peut-être perdu quelque chose : l'idée qu'un objet peut être utile ET beau en même temps. Les ingénieurs du XIXe le savaient. Nous, on l'a oublié."}
              </p>
            </div>
            <div className="rounded-lg overflow-hidden relative">
              <img
                src="/images/serure.jpg"
                alt="Serrure ornementée du musée Arts et Métiers"
                className="w-full h-full object-cover rounded-lg"
              />
              <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/70 bg-background/80 px-3 py-1.5 rounded">
                Serrure à combinaison, 1786 — Musée Arts et Métiers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* QCM Game Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Cog className="w-6 h-6 text-accent animate-spin-slow" />
            <h2 className="text-4xl font-bold text-center">Quiz Mécanique</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10 text-pretty">
            Testez vos connaissances sur les objets du Musée des Arts et Métiers — 7 questions pour devenir expert(e) !
          </p>
          <QCMGame />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-semibold mb-2">Mohamed, Aziz et Safaa</p>
          <p className="text-muted-foreground">Étudiants en Informatique - 2026</p>
          <p className="text-sm text-muted-foreground mt-4">
            Projet réalisé dans le cadre de la visite du Musée des Arts et Métiers
          </p>
        </div>
      </footer>

      {/* Modal for Object Details */}
      {selectedObject && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-in fade-in overflow-y-auto"
          onClick={() => setSelectedObject(null)}
        >
          <Card 
            className="max-w-3xl w-full p-12 relative animate-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setSelectedObject(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            {objects.find(obj => obj.id === selectedObject) && (
              <>
                {/* Large photo in modal */}
                <div className="h-80 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                  {objects.find(obj => obj.id === selectedObject)?.image ? (
                    <img 
                      src={objects.find(obj => obj.id === selectedObject)?.image || ''} 
                      alt={objects.find(obj => obj.id === selectedObject)?.title || ''}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Cog className="w-32 h-32 text-muted-foreground/20" />
                  )}
                  <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/60 bg-background/90 px-3 py-1.5 rounded z-10">
                    Photo du musée Arts et Métiers
                  </span>
                </div>
                
                <span className="text-sm font-mono text-accent">
                  {objects.find(obj => obj.id === selectedObject)?.year}
                </span>
                <h3 className="text-4xl font-bold my-4 text-balance">
                  {objects.find(obj => obj.id === selectedObject)?.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
                  {objects.find(obj => obj.id === selectedObject)?.details}
                </p>
                
                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-l-accent">
                  <h4 className="font-bold mb-3 text-accent">Lien avec l'actualité :</h4>
                  <p className="leading-relaxed text-pretty">
                    {objects.find(obj => obj.id === selectedObject)?.link}
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Modal for Inventor Details */}
      {selectedInventor && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-in fade-in overflow-y-auto"
          onClick={() => setSelectedInventor(false)}
        >
          <Card 
            className="max-w-3xl w-full p-12 relative animate-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setSelectedInventor(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            <h3 className="text-4xl font-bold mb-4">Senot — Pionnier de la Mécanique de Précision</h3>
            <p className="text-lg text-accent mb-8 font-mono">XIXe siècle</p>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h4 className="font-bold text-foreground mb-2">Des Instruments d'une Précision Remarquable</h4>
                <p className="text-pretty">
                  {'Senot est un ingénieur mécanicien français du XIXe siècle dont les travaux sur les instruments de mesure de précision ont profondément influencé l\'industrie naissante. Ses instruments permettaient de vérifier et garantir des cotes identiques d\'une pièce à l\'autre, ouvrant la voie à la fabrication en série et à l\'interchangeabilité des composants mécaniques.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-2">La Rigueur au Cœur de l'Innovation</h4>
                <p className="text-pretty">
                  {'Le travail de Senot s\'inscrit dans un contexte où la précision de mesure devient un enjeu industriel majeur. Là où l\'artisan réglait ses pièces à l\'œil, Senot impose des outils capables de quantifier l\'écart avec une précision qu\'aucun sens humain ne peut atteindre. Cette exigence de mesure exacte transforme la fabrication mécanique en discipline scientifique.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-2">Un Héritage au Cœur de l'Informatique</h4>
                <p className="text-pretty">
                  {'Les principes établis par Senot — mesure rigoureuse, reproductibilité, tolérance zéro à l\'erreur — sont les mêmes que ceux qui gouvernent l\'informatique moderne. Un processeur manipule des milliards de bits par seconde en garantissant qu\'aucun ne soit ambigu. La culture de la précision absolue, inaugurée par des ingénieurs comme Senot, est le fondement invisible de tout système numérique.'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
