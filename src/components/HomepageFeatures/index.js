import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Hands-On Learning for Physical AI',
    Svg: require('@site/static/img/undraw_robotics.svg').default,
    description: (
      <>
        Explore the foundations of Physical AI with practical, intuitive lessons. 
        Learn how intelligent embodied systems perceive, move, and interact with the world.
      </>
    ),
  },
  {
    title: 'Build & Explore Digital Twins',
    Svg: require('@site/static/img/simulation.svg').default,
    description: (
      <>
        Create rich digital twins to visualize real-world environments, test behaviors, 
        and understand how humanoid systems respond under different conditions.
      </>
    ),
  },
  {
    title: 'Intelligence for Humanoid Systems',
    Svg: require('@site/static/img/undraw_artificial_intelligence.svg').default,
    description: (
      <>
        Dive into the core principles that enable humanoid robots to understand their 
        surroundings, make decisions, and perform complex actions in real-time.
      </>
    ),
  },
];


function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
