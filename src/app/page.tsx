"use client"

import styles from './page.module.css'
import { useState } from 'react';
import mentions from "@/data.json";
import { AutoComplete } from 'antd'

export default function Home() {

  const [text, setText] = useState<string>('');
  const [matchingMentionList, setMatchingMentionList] = useState<{ value: string }[]>([])

  const handleInputChange = (value: string) => {

    const inputText = value;
    setText(inputText);
    const lastWord = inputText.split(' ').pop();

    if (lastWord && lastWord.startsWith('@')) {

      const query = lastWord.substring(1);
      const matchingMentions = mentions.filter((mention) =>
        mention.first_name.toLowerCase().includes(query.toLowerCase())
      );
      const mappedMentions = matchingMentions.map(mention => ({
        value: mention.first_name,
      }))
      setMatchingMentionList(mappedMentions || [])
    }
  };

  const handleSelect = (value: string) => {

    setMatchingMentionList([])
    setText(state => {
      let text = state.split("@")
      return text[0]+"@"+value;
    })
  }

  return (
    <div className={styles.container}>
      <AutoComplete
        style={{ width: 200 }}
        onSearch={handleInputChange}
        placeholder="use @ for mention"
        options={matchingMentionList.slice(0, 5)}
        onSelect={handleSelect}
        value={text}
      />
    </div>
  )
}
