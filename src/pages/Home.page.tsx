import Filters from "@/components/table/filters";
import { AppShell, Burger, Group, Title, ScrollArea, Table, Button, TextInput, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface DataRow {
  fournisseur: string;
  categorie: string;
  sousCategorie: string;
  qualite: string;
  section: string;
  produit: string;
  unite: string;
  stock: number;
}

const data: DataRow[] = [
  {
    fournisseur: "ABC Corp",
    categorie: "Bois",
    sousCategorie: "Chêne",
    qualite: "Premium",
    section: "A1",
    produit: "Planche",
    unite: "m²",
    stock: 100,
  },
  {
    fournisseur: "XYZ Ltd",
    categorie: "Métal",
    sousCategorie: "Aluminium",
    qualite: "Standard",
    section: "B2",
    produit: "Plaque",
    unite: "kg",
    stock: 50,
  },
];



export default function DataPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialFilters = () => {
    const params = new URLSearchParams(location.search);
    return {
      fournisseur: params.get("fournisseur") || "",
      categorie: params.get("categorie") || "",
      sousCategorie: params.get("sousCategorie") || "",
      qualite: params.get("qualite") || "",
      depot: params.get("depot") || "",
      longueur: params.get("longueur") || "",
      largeur: params.get("largeur") || "",
      epaisseur: params.get("epaisseur") || "",
      unite: params.get("unite") || "",
      localImport: params.get("localImport") || "",
      date: params.get("date") || new Date().toISOString(),
    };
  };

  const [filters, setFilters] = useState(getInitialFilters);

  const onFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const filteredParams = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    navigate({ search: new URLSearchParams(filteredParams).toString() });
  }, [filters, navigate]);


  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      header={{ height: 100 }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header className="bg-gray-900 text-white flex items-center">
        <img src="src/comarbois_logo.png" alt="Comarbois Logo" className="w-40 h-20 mr-4" />
        <Title order={2} className="text-black text-center flex-grow">
          Articles Management
        </Title>
      </AppShell.Header>

      {/* Sidebar */}
      <AppShell.Navbar className="bg-gray-800 text-white">
        <ScrollArea className="p-4"> {/* Sidebar content here */} </ScrollArea>
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Filters Section */}
          <Filters filters={filters} setFilters={setFilters} onFilterChange={onFilterChange} />

          {/* Table Section */}
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Fournisseur</Table.Th>
                <Table.Th>Catégorie</Table.Th>
                <Table.Th>Sous-Catégorie</Table.Th>
                <Table.Th>Qualité</Table.Th>
                <Table.Th>Section</Table.Th>
                <Table.Th>Produit</Table.Th>
                <Table.Th>Unité</Table.Th>
                <Table.Th>Stock</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((row, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{row.fournisseur}</Table.Td>
                  <Table.Td>{row.categorie}</Table.Td>
                  <Table.Td>{row.sousCategorie}</Table.Td>
                  <Table.Td>{row.qualite}</Table.Td>
                  <Table.Td>{row.section}</Table.Td>
                  <Table.Td>{row.produit}</Table.Td>
                  <Table.Td>{row.unite}</Table.Td>
                  <Table.Td>{row.stock}</Table.Td>
                  <Table.Td>
                  <Button size="xs" color="blue" className="mr-2">
                      modifier
                  </Button>
                  <Button size="xs" color="blue" className="mr-2">
                      dupliquer
                  </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
