// frontend/test/metabase/lib/filterEntityConnections.unit.spec.ts

import {
  type EntityConnection,
  filterEntityConnections,
} from "metabase/lib/filterEntityConnections";

describe("filterEntityConnections", () => {
  it("deve retornar apenas conexões cujas tabelas estão ativas", () => {
    const connections: EntityConnection[] = [
      {
        table: { id: 1, name: "Products", active: true },
      },
      {
        table: { id: 2, name: "Old_Products", active: false },
      },
    ];

    const result = filterEntityConnections(connections);

    expect(result).toHaveLength(1);
    expect(result[0].table.name).toBe("Products");
  });
});
