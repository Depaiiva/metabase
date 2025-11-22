// frontend/src/metabase/lib/filterEntityConnections.ts

type Table = {
  id: number;
  name: string;
  active?: boolean;
};

export type EntityConnection = {
  table?: Table | null;
};

function isValidTable(t: Table | null | undefined): t is Table {
  return !!t && typeof t === "object";
}

export function filterEntityConnections(
  connections: EntityConnection[] = [],
): EntityConnection[] {
  return connections.filter((conn) => {
    const t = conn.table;
    return isValidTable(t) && t.active !== false;
  });
}

it("deve retornar lista vazia quando todas as tabelas relacionadas estiverem inativas", () => {
  const connections: EntityConnection[] = [
    { table: { id: 1, name: "TabelaA", active: false } },
    { table: { id: 2, name: "TabelaB", active: false } },
    { table: { id: 3, name: "TabelaC", active: false } },
  ];

  const result = filterEntityConnections(connections);

  expect(result).toHaveLength(0);
  expect(result).toEqual([]);
});
