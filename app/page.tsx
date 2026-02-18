'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Cog, Wrench, Lightbulb, ChevronRight, X } from 'lucide-react'
import MuseumRunnerGame from '@/components/museum-runner-game'

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
                <h3 className="text-4xl font-bold mb-4">Blaise Pascal</h3>
                <p className="text-lg text-accent mb-6 font-mono">1623 - 1662</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    {'Mathématicien, physicien et inventeur français de génie, Blaise Pascal révolutionne le calcul mécanique en inventant la Pascaline en 1642, à l\'âge de seulement 19 ans. Cette première machine à calculer permettait d\'effectuer des additions et soustractions grâce à un système d\'engrenages et de roues dentées.'}
                  </p>
                  <p className="text-pretty">
                    {'Pascal conçut cette machine pour aider son père, collecteur d\'impôts, dans ses calculs fastidieux. Il en construisit une cinquantaine d\'exemplaires, mais la complexité et le coût élevé limitèrent son succès commercial. Néanmoins, cette invention posa les bases de toutes les machines à calculer futures.'}
                  </p>
                  <p className="text-pretty">
                    {'Le mécanisme de report automatique de la Pascaline, qui gère les retenues entre les ordres décimaux, est identique au fonctionnement des ALU (Arithmetic Logic Units) dans nos processeurs modernes. Pascal a créé sans le savoir l\'ancêtre mécanique de l\'informatique.'}
                  </p>
                </div>
                <Button 
                  onClick={() => setSelectedInventor(true)}
                  className="mt-8"
                >
                  {'En savoir plus sur Pascal'}
                </Button>
              </div>
              <div className="bg-gradient-to-br from-secondary to-muted rounded-lg overflow-hidden relative">
                {/* Photo placeholder for Pascal portrait */}
                <div className="aspect-[3/4] flex items-center justify-center relative">
                  <img 
                    src="/images/blaisepascal.webp"
                    alt="Blaise Pascal"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <Lightbulb className="w-32 h-32 text-accent opacity-30 absolute" />
                </div>
                <span className="absolute bottom-4 right-4 text-xs text-muted-foreground/60 bg-background/80 px-3 py-1.5 rounded">
                  {'Portrait de Blaise Pascal'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Reflection Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Réflexion : Du Mécanique au Numérique</h2>
          <Card className="p-12 border-2 border-accent/20">
            <p className="text-lg leading-relaxed mb-6 text-pretty">
              {'Le métier Jacquard et ses cartes perforées, la Pascaline et son mécanisme de calcul, l\'horloge marine de Berthoud et sa précision : ces objets posent une question fascinante sur notre époque actuelle : **l\'intelligence artificielle n\'est-elle pas la continuation de cette quête d\'automatisation ?**'}
            </p>
            <p className="text-lg leading-relaxed mb-6 text-pretty">
              {'En 1642, Pascal automatise le calcul avec des engrenages. En 1801, Jacquard programme des motifs textiles complexes via des cartes perforées. En 2026, nous "programmons" des modèles d\'IA via des datasets. Dans tous les cas, nous encodons des patterns pour automatiser des tâches jadis réservées aux humains.'}
            </p>
            <p className="text-lg leading-relaxed text-pretty font-semibold text-accent">
              {'La question éthique demeure : jusqu\'où déléguer notre créativité et notre intelligence à la machine ? La Pascaline a libéré les comptables de calculs fastidieux, le métier Jacquard a transformé le tissage, et l\'horloge marine a révolutionné la navigation. L\'IA générative suit-elle le même chemin pour les créateurs d\'aujourd\'hui ?'}
            </p>
          </Card>
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
                <h3 className="text-2xl font-bold mb-4 text-balance">Le Piano Mécanique : Une Expérience Contrastée</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {'Lors de notre visite au musée Arts et Métiers, nous avons découvert un magnifique piano mécanique dans la section mécanique. Safaa, fascinée par cet instrument, a voulu l\'utiliser et le voir de plus près. Malheureusement, le personnel du musée ne l\'a pas autorisée à l\'approcher ou à l\'essayer, malgré sa curiosité légitime.'}
                </p>
                <p className="text-muted-foreground leading-relaxed text-pretty mt-4">
                  {'Ce qui m\'a particulièrement marqué, c\'est que quelques instants plus tard, j\'ai pu m\'approcher du même piano et même l\'examiner de près sans que personne ne me dise quoi que ce soit. Cette différence de traitement, bien que peut-être involontaire, m\'a fait réfléchir sur l\'importance de l\'égalité d\'accès à la culture et aux expériences muséales pour tous les visiteurs.'}
                </p>
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
              {'En tant qu\'informaticien, cette visite a été une révélation : **chaque ligne de code que j\'écris descend directement de ces mécanismes**.'}
            </p>
            <p className="text-lg leading-relaxed mb-6 text-pretty">
              {'La Pascaline m\'a fait réaliser que les ALU (Arithmetic Logic Units) de nos processeurs modernes utilisent exactement les mêmes principes de report de retenue que Pascal a inventés en 1642. Les cartes perforées du métier Jacquard sont les ancêtres directs de la mémoire ROM - un programme figé dans la matière. L\'horloge marine de Berthoud préfigure les systèmes de synchronisation distribués de nos réseaux informatiques.'}
            </p>
            <p className="text-lg leading-relaxed mb-6 text-pretty">
              {'Ces objets me rappellent que l\'informatique n\'est pas une discipline abstraite : elle est ancrée dans la physique, la mécanique, et l\'ingéniosité humaine. Quand je débogue un algorithme, je suis l\'héritier de Pascal cherchant à perfectionner ses engrenages. Quand j\'écris un programme, je suis l\'héritier de Jacquard perforant ses cartes.'}
            </p>
            <p className="text-lg leading-relaxed font-semibold text-pretty">
              {'Mon défi en tant que développeur : créer des systèmes qui, comme ces machines, traverseront les siècles par leur élégance conceptuelle et leur utilité universelle.'}
            </p>
          </Card>
        </div>
      </section>

      {/* Game Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Cog className="w-6 h-6 text-accent animate-spin-slow" />
            <h2 className="text-4xl font-bold text-center">Museum Runner</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10 text-pretty">
            {'Courez dans les rues du musée, sautez par-dessus les obstacles et collectez les engrenages !'}
          </p>
          <MuseumRunnerGame />
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
            
            <h3 className="text-4xl font-bold mb-4">Blaise Pascal - Pionnier du Calcul Mécanique</h3>
            <p className="text-lg text-accent mb-8 font-mono">1623 - 1662</p>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h4 className="font-bold text-foreground mb-2">La Pascaline : Une Innovation Révolutionnaire</h4>
                <p className="text-pretty">
                  {'En 1642, à l\'âge de seulement 19 ans, Pascal invente la première machine à calculer mécanique de l\'histoire. Il conçoit cette machine pour aider son père, collecteur d\'impôts à Rouen, dans ses calculs fastidieux. La Pascaline permettait d\'effectuer des additions et soustractions grâce à un système d\'engrenages et de roues dentées.'}
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-foreground mb-2">Un Mécanisme de Génie</h4>
                <p className="text-pretty">
                  {'Le mécanisme de report automatique de la Pascaline est d\'une ingéniosité remarquable. Chaque roue représente un ordre décimal (unités, dizaines, centaines...), et lorsqu\'une roue passe de 9 à 0, elle déclenche automatiquement l\'incrémentation de la roue suivante. Ce système de retenue mécanique fonctionne exactement comme les opérations arithmétiques dans nos processeurs modernes.'}
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-foreground mb-2">Héritage et Modernité</h4>
                <p className="text-pretty">
                  {'Pascal construisit une cinquantaine d\'exemplaires de sa machine, mais la complexité et le coût élevé limitèrent son succès commercial. Néanmoins, cette invention posa les bases de toutes les machines à calculer futures, des arithmomètres aux ordinateurs modernes. Les ALU (Arithmetic Logic Units) de nos processeurs utilisent exactement les mêmes principes de report de retenue que la Pascaline.'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
