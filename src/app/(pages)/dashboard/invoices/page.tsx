import React, {Suspense} from 'react';
import {NextPage} from 'next'
import {lusitana} from '@/src/app/ui/fonts'
import Search from '@/src/app/ui/search'
import {CreateInvoice} from '@/src/app/ui/invoices/buttons'
import {InvoicesTableSkeleton} from '@/src/app/ui/skeletons'
import InvoicesTable from '@/src/app/ui/invoices/table'
import {fetchInvoicesPages} from '@/src/app/lib/data'
import Pagination from '@/src/app/ui/invoices/pagination'

interface IInvoices {
    searchParams?: Promise<{
        query?: string
        page?: string
    }>
}

const Invoices: NextPage<IInvoices> = async (props) => {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const totalPages = await fetchInvoicesPages(query)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..."/>
                <CreateInvoice/>
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
                <InvoicesTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
};

export default Invoices;