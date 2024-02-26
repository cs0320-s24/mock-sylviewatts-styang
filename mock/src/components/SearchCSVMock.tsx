interface actionProps {
  filename: string;
  value: string;
  columnID: number;
  columnName: string;
}

//TODO: figure out search more (pretending one search for 9 million and row population)
export function searchCSV(props: actionProps) {
  return (
    <div className="search-CSV" aria-label="search-CSV">
      {"result: success, data: " +
        [
          "New York City",
          "Yes",
          "9 million",
          "Humid continental",
          "United States of America",
        ]}
    </div>
  );
}
