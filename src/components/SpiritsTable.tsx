import React, { useState } from 'react';
import { SpiritsList } from '../data/spiritsList.ts';
import styles from './SpiritsTable.module.css';
import Select, { SingleValue } from 'react-select';

const SpiritsTable = ({ spiritsList }: { spiritsList: SpiritsList }) => {
  const filterOptions = ['All', ...Object.keys(spiritsList)].map(
    (spiritName) => ({
      value: spiritName,
      label: spiritName[0].toUpperCase() + spiritName.slice(1),
    })
  );

  const [selectedOption, setSelectedOption] = useState<
    SingleValue<{ value: string; label: string }>
  >(filterOptions[0]);

  return (
    <div className={styles.wrapper}>
      <h2>Spirits List Wiki</h2>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={selectedOption}
        onChange={(value) => {
          console.log('--- changing react select ---');
          console.log('--- value=', value);
          setSelectedOption(value);
        }}
        isSearchable={false}
        name="color"
        options={filterOptions}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHead}>Category</th>
            <th className={styles.tableHead}>Spirit</th>
            <th className={styles.tableHead}>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(spiritsList)
            .filter(([category, spirits]) => {
              if (selectedOption.value === 'All') {
                return true;
              }

              if (selectedOption.value === category) {
                return true;
              }

              return false;
            })
            .map(([category, spirits]) =>
              React.createElement(
                React.Fragment,
                { key: category },
                Object.entries(spirits).map(([spirit, price], index) => (
                  <tr
                    key={`${category}-${spirit}`}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                    }}
                  >
                    {index === 0 && (
                      <td
                        rowSpan={Object.keys(spirits).length}
                        className={styles.td}
                        style={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </td>
                    )}
                    <td className={`${styles.td} ${styles.textAlignLeft}`}>
                      {spirit}
                    </td>
                    <td className={styles.td}>{price} ₾</td>
                  </tr>
                ))
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export { SpiritsTable };
