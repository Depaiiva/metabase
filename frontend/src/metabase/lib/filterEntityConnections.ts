// frontend/src/metabase/lib/filterEntityConnections.ts

type Table = {
  id: number;
  name: string;
  active?: boolean;
};

export type EntityConnection = {
  table?: Table | null;
  // outros campos (ignorados aqui)
};

function isValidTable(t: Table | null | undefined): t is Table {
  return t != null && typeof t === "object" && "id" in t;
}

export function filterEntityConnections(
  connections: EntityConnection[] = [],
): EntityConnection[] {
  if (!Array.isArray(connections)) {
    return [];
  }

  return connections.filter((conn) => {
    const t = conn.table;
    return isValidTable(t) && t.active !== false;
  });
}
