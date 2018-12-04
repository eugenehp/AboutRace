import React from 'react'

import { navigate } from "gatsby"

import {
  ArticleCard,
  ClipCard,
  QACard,
  InterviewCard,
  QuickFactCard
} from '../components/cards'

const generate = (Component, key, object, onOpen) => <Component 
  key={key + '-' + object.title} 
  onOpen={ link => onOpen(link, object) } 
  data={object} 
/>

const filter = (object, queryFilter, filter) => {
  if(filter === 'qa') filter = 'faq'
  const flag = !queryFilter 
  || queryFilter === `recent` 
  || queryFilter === filter

  return flag
}

const generateArray = (array, queryFilter, key, Component, onOpen) => {
  const result = array
  .filter( o => filter(o, queryFilter, key) )
  .map( o => generate(Component, key, o, onOpen) )

  return result
}

const getCards = (cards, queryFilter, onOpen) => {
  if(!onOpen) onOpen = link => navigate(link)

  let {
    articles,
    clips,
    faqs,
    interviews,
    quickfacts,
  } = cards

  if(!articles) articles = []
  if(!clips) clips = []
  if(!faqs) faqs = []
  if(!interviews) interviews = []
  if(!quickfacts) quickfacts = []

  articles = generateArray(articles, queryFilter, 'article', ArticleCard, onOpen)
  clips = generateArray(clips, queryFilter, 'clip', ClipCard, onOpen)
  faqs = generateArray(faqs, queryFilter, 'qa', QACard, onOpen)
  interviews = generateArray(interviews, queryFilter, 'interview', InterviewCard, onOpen)
  quickfacts = generateArray(quickfacts, queryFilter, 'quickfact', QuickFactCard, onOpen)

  return [
    ...articles,
    ...clips,
    ...faqs,
    ...interviews,
    ...quickfacts,
  ]
}

export default getCards
