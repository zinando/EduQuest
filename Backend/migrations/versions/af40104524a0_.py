"""empty message

Revision ID: af40104524a0
Revises: 15bcd8049d3a
Create Date: 2023-10-08 04:22:27.129043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'af40104524a0'
down_revision = '15bcd8049d3a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('instruction', sa.String(length=625), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.drop_column('instruction')

    # ### end Alembic commands ###
