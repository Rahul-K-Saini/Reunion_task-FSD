"use client";
import React, { useState, useMemo, useCallback } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  Box,
  ActionIcon,
  Drawer,
  Select,
  Stack,
  Group,
  Button,
  Switch,
  TextInput,
  RangeSlider
} from "@mantine/core";
import dayjs from "dayjs";
import data from "@/data/data";

const IconLayoutGrid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  const IconFilter: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );

  const IconSort: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9l4 -4l4 4m-4 -4v14" />
      <path d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
  );

  const IconSort2: React.FC<React.SVGProps<SVGSVGElement> & { isActive?: boolean, isDesc?: boolean }> = ({
    isActive = false,
    isDesc = false,
    ...props
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isActive ? "blue" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {isDesc ? (
        <>
          <path d="M3 9l4 -4l4 4m-4 -4v14" />
          <path d="M21 15l-4 4l-4 -4m4 4v-14" />
        </>
      ) : (
        <>
          <path d="M21 9l-4 -4l-4 4m4 -4v14" />
          <path d="M3 15l4 4l4 -4m-4 4v-14" />
        </>
      )}
    </svg>
  );
  

const Table: React.FC = () => {
  const [isGroupingOpen, setIsGroupingOpen] = useState(false);
  const [groupingColumn, setGroupingColumn] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isColumnVisibilityOpen, setIsColumnVisibilityOpen] = useState(false);
  const [sortStates, setSortStates] = useState<Record<string, 'asc' | 'desc' | null>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 1000]);
  const [salePriceRange, setSalePriceRange] = useState<[number, number]>([10, 1000]);
 

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
      accessorKey: key,
      filterFn:
        key === "price" || key === "sale_price"
          ? "priceRangeFilter"
          : key === "name"
          ? "textFilter"
          : undefined,
    }));
  }, []);

  const formattedData = useMemo(
    () =>
      data.map((entry) => ({
        ...entry,
        createdAt: dayjs(entry.createdAt).format("YYYY-MM-DD"),
        updatedAt: dayjs(entry.updatedAt).format("YYYY-MM-DD"),
      })),
    []
  );

  const filterFns = {
    priceRangeFilter: (row, _columnId, filterValue: [number, number]) => {
      const price = row.getValue<number>('price');
      return price >= filterValue[0] && price <= filterValue[1];
    },
    textFilter: (row, _columnId, filterValue: string) => {
      const name = row.getValue<string>('name');
      return name.toLowerCase().includes(filterValue.toLowerCase());
    }
  };

  const table = useMantineReactTable({
    columns,
    data: formattedData,
    enableColumnResizing: true, 
    enableGrouping: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableFilters: true,
    enableHiding: false,
    filterFns,
    renderTopToolbarCustomActions: () => (
      <Group position="right" spacing="xs">
        <ActionIcon
          onClick={() => setIsGroupingOpen(true)}
          size="lg"
          variant="subtle"
        >
          <IconLayoutGrid />
        </ActionIcon>
        <ActionIcon
          onClick={() => setIsFilterOpen(true)}
          size="lg"
          variant="subtle"
        >
          <IconFilter />
        </ActionIcon>
        <ActionIcon
          onClick={() => setIsSortingOpen(true)}
          size="lg"
          variant="subtle"
        >
          <IconSort/>
        </ActionIcon>
        <ActionIcon
          onClick={() => setIsColumnVisibilityOpen(true)}
          size="lg"
          variant="subtle"
        >
          {/* Add a column visibility icon here */}
        </ActionIcon>
      </Group>
    ),
    initialState: {
      density: "xs",
      expanded: true,
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    mantineToolbarAlertBannerBadgeProps: { color: "blue", variant: "outline" },
    mantineTableContainerProps: { sx: { maxHeight: 700 } },
    enableColumnActions: false,
    enableColumnFilters: false,
    enableColumnDragging: false,
  });

 
  const handleGroupingApply = useCallback(() => {
    if (groupingColumn) {
      table.getColumn(groupingColumn)?.toggleGrouping();
    }
    setIsGroupingOpen(false);
  }, [groupingColumn, table]);

  const handleClearGrouping = useCallback(() => {
    table.resetGrouping();
    setGroupingColumn("");
  }, [table]);

  const handleClearAllFilters = useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  const handleSort = useCallback(
    (columnId: string) => {
      const currentState = sortStates[columnId];
      let newState: 'asc' | 'desc' | null;

      if (currentState === 'asc') {
        newState = 'desc';
        table.setSorting([{ id: columnId, desc: true }]);
      } else if (currentState === 'desc') {
        newState = null;
        table.resetSorting();
      } else {
        newState = 'asc';
        table.setSorting([{ id: columnId, desc: false }]);
      }

      setSortStates(prev => ({ ...prev, [columnId]: newState }));
    },
    [table, sortStates]
  );  

  const handleColumnVisibilityChange = useCallback(
    (columnId: string, isVisible: boolean) => {
      table.getColumn(columnId)?.toggleVisibility(isVisible);
    },
    [table]
  );



  const renderFilterDrawer = () => (
    <Drawer
      opened={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      title="Filters"
      position="right"
      padding="xl"
      size="sm"
    >
     <Stack>
        {columns.map((column) => {
          if (column.header === "Name") {
            return (
              <TextInput
                label="Name"
                key={column.accessorKey}
                placeholder={`Filter by ${column.header}`}
                onChange={(event) =>
                  table.getColumn(column.accessorKey)?.setFilterValue(event.currentTarget.value)
                }
              />
            );
          } else if (column.header === "Price") {
            return (
              <Box key={column.accessorKey}>
                <label>{column.header}</label>
                <RangeSlider
                  label={(value) => `$${value}`}
                  min={10}
                  max={1000}
                  step={1}
                  value={priceRange}
                  onChange={(value) => {
                    setPriceRange(value);
                    table.getColumn(column.accessorKey)?.setFilterValue(value);
                  }}
                />
              </Box>
            );
          } else if (column.header === "Sale price") {
            return (
              <Box key={column.accessorKey}>
                <label>{column.header}</label>
                <RangeSlider
                  label={(value) => `$${value}`}
                  min={10}
                  max={1000}
                  step={1}
                  value={salePriceRange}
                  onChange={(value) => {
                    setSalePriceRange(value);
                    table.getColumn(column.accessorKey)?.setFilterValue(value);
                  }}
                />
              </Box>
            );
          } else {
            return (
              <Select
                key={column.accessorKey}
                label={column.header}
                placeholder={`Filter by ${column.header}`}
                data={[
                  ...new Set(formattedData.map((item) => item[column.accessorKey])),
                ].map(String)}
                onChange={(value) =>
                  table.getColumn(column.accessorKey)?.setFilterValue(value)
                }
              />
            );
          }
        })}
        <Button
          onClick={handleClearAllFilters}
          variant="filled"
          color="blue"
          fullWidth
        >
          Clear Filters
        </Button>
      </Stack>
    </Drawer>
  );

  const renderGroupingDrawer = () => (
    <Drawer
      opened={isGroupingOpen}
      onClose={() => setIsGroupingOpen(false)}
      title="Create Groups"
      position="right"
      padding="xl"
      size="sm"
    >
      <Stack>
        <Select
          label="Select a column"
          placeholder="Choose column for grouping"
          data={[
            { value: "category", label: "Category" },
            { value: "subcategory", label: "SubCategory" },
          ]}
          value={groupingColumn}
          onChange={setGroupingColumn}
        />
        <Button
          onClick={handleClearGrouping}
          variant="outline"
          color="gray"
          fullWidth
        >
          Clear Grouping
        </Button>
        <Button
          onClick={handleGroupingApply}
          variant="filled"
          color="blue"
          fullWidth
        >
          Apply grouping
        </Button>
      </Stack>
    </Drawer>
  );

  const renderSortingDrawer = () => (
    <Drawer
      opened={isSortingOpen}
      onClose={() => setIsSortingOpen(false)}
      title="Sorting Options"
      position="right"
      padding="xl"
      size="sm"
    >
      <Stack>
      {columns.map((column) => (
        <Button
          key={column.accessorKey}
          onClick={() => handleSort(column.accessorKey)}
          variant="outline"
          color={sortStates[column.accessorKey] ? "blue" : "gray"}
          fullWidth
          rightIcon={
            <IconSort2 
              isActive={!!sortStates[column.accessorKey]} 
              isDesc={sortStates[column.accessorKey] === 'desc'}
            />
          }
          styles={(theme) => ({
            rightIcon: {
              marginRight: theme.spacing.xs,
            },
          })}
        >
           {column.header}
        </Button>
      ))}
      <Button
        onClick={() => {
          table.resetSorting();
          setSortStates({});
          setIsSortingOpen(false);
        }}
        variant="filled"
        color="blue"
        fullWidth
      >
        Clear All Sorting
      </Button>
    </Stack>
    </Drawer>
  );

  const renderColumnVisibilityDrawer = () => (
    <Drawer
      opened={isColumnVisibilityOpen}
      onClose={() => setIsColumnVisibilityOpen(false)}
      title="Show/Hide Columns"
      position="right"
      padding="xl"
      size="sm"
    >
      <Stack>
        {columns.map((column) => (
          <Switch
            key={column.accessorKey}
            label={column.header}
            checked={table.getColumn(column.accessorKey)?.getIsVisible()}
            onChange={(event) =>
              handleColumnVisibilityChange(
                column.accessorKey,
                event.currentTarget.checked
              )
            }
          />
        ))}
        <Button
          onClick={() => {
            table.resetColumnVisibility();
            setIsColumnVisibilityOpen(false);
          }}
          variant="filled"
          color="blue"
          fullWidth
        >
          Show all columns
        </Button>
      </Stack>
    </Drawer>
  );

  return (
    <Box>
      {renderFilterDrawer()}
      {renderGroupingDrawer()}
      {renderSortingDrawer()}
      {renderColumnVisibilityDrawer()}
      <MantineReactTable table={table} />
    </Box>
  );
};

export default Table;