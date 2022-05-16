/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useBottomSheetDispatch } from "@tensoremr/bottom-sheet";
import { TablePagination } from "../../components/TablePagination";
import {
  FollowUpOrder,
  FollowUpOrderStatus,
  PaginationInput,
  Query,
  QuerySearchFollowUpOrdersArgs,
} from "../../models/models";
import { useNotificationDispatch } from "@tensoremr/notification";
import cn from "classnames";
import CompleteFollowUpOrderForm from "../../components/CompleteFollowUpOrderForm";

const SEARCH_FOLLOW_UP_ORDERS = gql`
  query SearchFollowUpOrders(
    $page: PaginationInput!
    $filter: FollowUpOrderFilter
    $date: Time
    $searchTerm: String
  ) {
    searchFollowUpOrders(
      page: $page
      filter: $filter
      date: $date
      searchTerm: $searchTerm
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          firstName
          lastName
          phoneNo
          userName
          patientId
          orderedBy {
            id
            firstName
            lastName
            userTypes {
              title
            }
          }
          followUps {
            id
            receptionNote
            status
          }
          status
          createdAt
        }
      }
    }
  }
`;

const PatientFollowUpOrders: React.FC<{ patientId: string }> = ({
  patientId,
}) => {
  const [paginationInput, setPaginationInput] = useState<PaginationInput>({
    page: 1,
    size: 20,
  });

  const bottomSheetDispatch = useBottomSheetDispatch();
  const notifDispatch = useNotificationDispatch();

  const { data, refetch } = useQuery<Query, QuerySearchFollowUpOrdersArgs>(
    SEARCH_FOLLOW_UP_ORDERS,
    {
      variables: {
        page: paginationInput,
        filter: {
          patientId,
        },
      },
    }
  );

  const handleNextClick = () => {
    const totalPages = data?.searchFollowUpOrders.pageInfo.totalPages ?? 0;

    if (totalPages > paginationInput.page) {
      setPaginationInput({
        ...paginationInput,
        page: paginationInput.page + 1,
      });
    }
  };

  const handlePrevClick = () => {
    if (paginationInput.page > 1) {
      setPaginationInput({
        ...paginationInput,
        page: paginationInput.page - 1,
      });
    }
  };

  const handleOrderClick = (order: FollowUpOrder) => {
    bottomSheetDispatch({
      type: "show",
      snapPoint: 0,
      children: (
        <CompleteFollowUpOrderForm
          selectedOrder={order}
          onSuccess={() => {
            refetch();
            notifDispatch({
              type: "show",
              notifTitle: "Success",
              notifSubTitle: "Receipt printed successfully",
              variant: "success",
            });
            bottomSheetDispatch({ type: "hide" });
          }}
          onCancel={() => bottomSheetDispatch({ type: "hide" })}
          onRefresh={() => {
            refetch();
          }}
        />
      ),
    });
  };

  return (
    <div>
      <table className="w-full divide-y divide-gray-200 shadow-md rounded-md">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ordered By
            </th>

            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.searchFollowUpOrders.edges.map((e) => {
            return (
              <tr
                key={e?.node.id}
                className="hover:bg-gray-100 bg-gray-50 cursor-pointer"
                onClick={() => e.node && handleOrderClick(e.node)}
              >
                <td className="px-6 py-4">
                  {format(parseISO(e?.node.createdAt), "MMM d, y")}
                </td>

                <td className="px-6 py-4">
                  {`${
                    e?.node.orderedBy?.userTypes.some(
                      (t) => t?.title === "Physician"
                    )
                      ? "Dr. "
                      : ""
                  } ${e.node.orderedBy?.firstName} ${
                    e.node.orderedBy?.lastName
                  }`}
                </td>

                <td className="px-6 py-4 text-sm text-teal-700 tracking-wide font-semibold">
                  <span
                    className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      {
                        "bg-yellow-100 text-yellow-800":
                          FollowUpOrderStatus.Ordered,
                      },
                      {
                        "bg-green-100 text-green-800":
                          FollowUpOrderStatus.Completed,
                      }
                    )}
                  >
                    {e?.node.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="">
        <TablePagination
          color="bg-gray-50 shadow-md"
          totalCount={data?.searchFollowUpOrders.totalCount ?? 0}
          onNext={handleNextClick}
          onPrevious={handlePrevClick}
        />
      </div>
    </div>
  );
};

export default PatientFollowUpOrders;
