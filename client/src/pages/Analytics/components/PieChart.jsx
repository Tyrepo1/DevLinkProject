import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import { extractValues } from '../../../api/Analytics/AnalyticsAPI';

export default function Pie({ data, keyName, name }) {
  const [skillCounts, setSkillCounts] = useState([]);
  const isMediumScreen = useMediaQuery('(max-width:960px)');

  useEffect(() => {
    const counts = {};

    data.forEach((entry) => {
      let skills;

      if (typeof entry[keyName] === 'string') {
        // If it's a string, split it into an array (considering it's a delimited string)
        skills = entry[keyName].split(',').map((skill) => skill.trim());
      } else if (Array.isArray(entry[keyName])) {
        // If it's an obj array, translate to string array and use it directly
        skills = extractValues(entry[keyName]);
      }

      skills.forEach((skill) => {
        const processedSkill = processSkill(skill);
        counts[processedSkill] = (counts[processedSkill] || 0) + 1;
      });
    });

    const formattedCounts = Object.entries(counts).map(([label, value]) => ({
      label: capitalizeFirstLetter(label),
      value,
    }));

    const singleOccurrenceFields = formattedCounts.filter(({ value }) => value === 1);

    if (singleOccurrenceFields.length > 1) {
      const othersCount = singleOccurrenceFields.reduce((sum, field) => sum + field.value, 0);
      formattedCounts.push({ label: 'Others', value: othersCount });
    }

    const filteredCounts = formattedCounts.filter(({ value, label }) => value > 1 || label === 'Others');

    const sortedCounts = filteredCounts
      .filter(({ label }) => label !== 'Others')
      .sort((a, b) => b.value - a.value);

    if (filteredCounts.some(({ label }) => label === 'Others')) {
      sortedCounts.push(filteredCounts.find(({ label }) => label === 'Others'));
    }

    setSkillCounts(sortedCounts);
  }, [data, keyName]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const processSkill = (skill) => {
    // Remove special characters for comparison
    return skill.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="primary">
          {name}
        </Typography>
        {isMediumScreen ? (
          <TopFiveList skillCounts={skillCounts} />
        ) : (
          <PieChart series={[{ data: skillCounts }]} height={300} />
        )}
      </CardContent>
    </Card>
  );
}

function TopFiveList({ skillCounts }) {
  const topFive = skillCounts.slice(0, 5);

  return (
    <ol>
      {topFive.map((skill, index) => (
        <li key={skill.label}>
          {ordinalSuffix(index + 1)}: {skill.label} - {skill.value}
        </li>
      ))}
    </ol>
  );
}

function ordinalSuffix(number) {
  const suffixes = ['st', 'nd', 'rd'];
  const remainder = number % 10;
  const suffix = suffixes[remainder - 1] || 'th';
  return `${number}${suffix}`;
}
