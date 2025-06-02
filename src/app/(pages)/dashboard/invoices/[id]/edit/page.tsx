import Breadcrumbs from '@/src/app/ui/invoices/breadcrumbs'
import Form from '@/src/app/ui/invoices/edit-form'
import {fetchCustomers, fetchInvoiceById} from '@/src/app/lib/data'
import {NextPage} from 'next'

interface IEditProps {
    params: Promise<{id: string}>
}

const Page: NextPage<IEditProps> = async (props) => {
    const params = await props.params
    const id = params.id

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers()
    ])

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
};

export default Page;