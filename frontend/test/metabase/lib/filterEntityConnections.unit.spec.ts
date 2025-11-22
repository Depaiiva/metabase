// frontend/test/metabase/lib/filterEntityConnections.unit.spec.ts
import {
  type EntityConnection,
  filterEntityConnections,
} from "metabase/lib/filterEntityConnections";

describe("filterEntityConnections", () => {
  it("deve retornar apenas conexões cujas tabelas estão ativas", () => {
    const connections: EntityConnection[] = [
      { table: { id: 1, name: "Products", active: true } },
      { table: { id: 2, name: "Old_Products", active: false } },
    ];

    const result = filterEntityConnections(connections);

    expect(result).toHaveLength(1);
    expect(result[0].table.name).toBe("Products");
  });

  it("deve excluir conexões sem objeto table (table undefined ou null)", () => {
    const connections: EntityConnection[] = [
      { table: { id: 1, name: "Products", active: true } },
      {} as unknown as EntityConnection,
      { table: null as unknown as any } as unknown as EntityConnection,
      { table: { id: 2, name: "Old_Products", active: false } },
    ];

    const result = filterEntityConnections(connections);

    expect(result).toHaveLength(1);
    expect(result[0].table.name).toBe("Products");
  });

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
});
