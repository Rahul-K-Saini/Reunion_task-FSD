"use client";
import React, { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import dayjs from 'dayjs';
import { ShoppingItems } from "@/types/shoppingItems";
import data from "@/data/data";

const Table = () => {

  // dynamically generate the columns based on the first entry of array items
  const generateColumns = useMemo(() => {
    return (data: ShoppingItems[]) => 
      {
      if (data.length === 0) return [];
      const firstItem = data[0];
      return Object.keys(firstItem).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
        accessorKey: key,
        enableGrouping: key !== "id",
      }));
    };
  }, []);

  // formatting the dates before passing the data to the table
  const formatData = useMemo(() => {
    return (data: ShoppingItems[]): ShoppingItems[] =>
      data.map((entry) => ({
        ...entry,
        createdAt: dayjs(entry.createdAt).format('YYYY-MM-DD'),
        updatedAt: dayjs(entry.updatedAt).format('YYYY-MM-DD'),
      }));
  }, []);

  // Memoize columns and formatted data to prevent unnecessary recalculations
  const columns = useMemo(() => generateColumns(data), [generateColumns]);
  const formattedData = useMemo(() => formatData(data), [formatData]);

  const table = useMantineReactTable({
    columns,
    data: formattedData,
    enableColumnResizing: true,
    enableGrouping: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: {
      density: "xs",
      expanded: true,
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    mantineToolbarAlertBannerBadgeProps: { color: "blue", variant: "outline" },
    mantineTableContainerProps: { sx: { maxHeight: 700 } },
  });

  return <MantineReactTable table={table} />;
};

export default Table;
